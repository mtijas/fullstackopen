import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

function BlogList() {
  const blogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes);
  });
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
}

function Blog({ blog }) {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  function handleClose(event) {
    event.preventDefault();
    setShowDetails(false);
  }

  function handleOpen(event) {
    event.preventDefault();
    setShowDetails(true);
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
        {blog.user.username === loggedInUser.username && (
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
