import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

function BlogList({ blogs, blogService, handleSetBlogs, user }) {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          blogService={blogService}
          handleSetBlogs={handleSetBlogs}
          user={user}
        />
      ))}
    </>
  );
}

function Blog({ blog, blogs, blogService, handleSetBlogs, user }) {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  function handleClose(event) {
    event.preventDefault();
    setShowDetails(false);
  }

  function handleOpen(event) {
    event.preventDefault();
    setShowDetails(true);
  }

  async function handleLike(event) {
    event.preventDefault();

    const changedBlog = { ...blog, likes: blog.likes + 1 };
    try {
      const returnedBlog = await blogService.update(blog.id, changedBlog);
      returnedBlog.user = blog.user;
      handleSetBlogs(blogs.map((b) => (b.id !== blog.id ? b : returnedBlog)));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "error", 5));
    }
  }

  async function handleDelete(event) {
    event.preventDefault();

    if (!window.confirm(`Do you really want to delete ${blog.title}`)) {
      return;
    }

    try {
      await blogService.destroy(blog.id);
      handleSetBlogs(blogs.filter((b) => b.id !== blog.id));

      dispatch(setNotification("Blog deleted", "success", 5));
    } catch (exception) {
      dispatch(setNotification("Error deleting blog", "error", 5));
    }
  }

  const details = (
    <>
      <div>{blog.url}</div>
      <div>
        Likes: {blog.likes}
        <button onClick={handleLike}>Like</button>
      </div>
      <div>{blog.user.name}</div>
      <div>
        <button onClick={handleClose}>Close</button>
        {blog.user.username === user.username && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </div>
    </>
  );

  return (
    <article className="blog">
      {blog.title} | {blog.author}
      {showDetails ? details : <button onClick={handleOpen}>Details</button>}
    </article>
  );
}

export { Blog, BlogList };
