import { React, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { Link, useParams } from "react-router-dom";

function BlogList() {
  const blogFormRef = useRef();
  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes);
  });

  return (
    <>
      <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function Blog() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const filtered = blogs.filter((b) => b.id === id);
  const blog = filtered[0];

  if (!blog) {
    return <h2>Blog not found</h2>;
  }

  function handleLike(event) {
    event.preventDefault();
    dispatch(likeBlog(blog));
  }

  function handleDelete(event) {
    event.preventDefault();

    if (!window.confirm(`Do you really want to delete ${blog.title}`)) {
      return;
    }

    dispatch(deleteBlog(blog.id));
  }

  return (
    <article className="blog">
      <h2>
        {blog.title} | {blog.author}
      </h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>

      <p>
        Likes: {blog.likes}
        <button onClick={handleLike}>Like</button>
      </p>
      <p>Added by {blog.user.name}</p>
      <div>
        {blog.user.username === loggedInUser.username && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </div>
    </article>
  );
}

export { Blog, BlogList };
