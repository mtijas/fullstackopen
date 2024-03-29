import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";
import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return state.concat([action.payload]);
    },
    patchBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, patchBlog, setBlogs, removeBlog } =
  blogSlice.actions;
export default blogSlice.reducer;

export function initializeBlogs() {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (exception) {
      console.error(`Error getting initial data: '${exception}'`);
      dispatch(
        setNotification(
          `Error getting initial data: '${exception}'`,
          "danger",
          5
        )
      );
    }
  };
}

export function createBlog(content) {
  return async (dispatch, getState) => {
    try {
      const { loggedInUser } = getState();
      const newBlog = await blogService.create(content);
      newBlog.user = loggedInUser;
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(
          `New blog added: ${content.title} by ${content.author}`,
          "success",
          5
        )
      );
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "danger", 5));
    }
  };
}

export function deleteBlog(id) {
  return async (dispatch) => {
    try {
      await blogService.destroy(id);
      dispatch(removeBlog(id));
      dispatch(setNotification("Blog deleted", "success", 5));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "danger", 5));
    }
  };
}

export function likeBlog(blog) {
  return async (dispatch) => {
    try {
      const patchedBlog = { ...blog, likes: blog.likes + 1 };
      const result = await blogService.update(patchedBlog);
      dispatch(patchBlog(patchedBlog));
      dispatch(
        setNotification(
          `Liked blog: ${result.title} by ${result.author}`,
          "success",
          5
        )
      );
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "danger", 5));
    }
  };
}

export function commentBlog(blog, comment) {
  return async (dispatch) => {
    try {
      const newComment = await blogService.comment(blog.id, comment);
      newComment.blog = blog;
      dispatch(
        patchBlog({ ...blog, comments: [...blog.comments, newComment] })
      );
      dispatch(setNotification("Comment added", "success", 5));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "danger", 5));
    }
  };
}
