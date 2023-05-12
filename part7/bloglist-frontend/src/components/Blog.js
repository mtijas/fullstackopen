import { React, useState } from "react";

function BlogList({
  blogs,
  blogService,
  handleSetNotification,
  handleSetBlogs,
  user,
}) {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          blogService={blogService}
          handleSetNotification={handleSetNotification}
          handleSetBlogs={handleSetBlogs}
          user={user}
        />
      ))}
    </>
  );
}

function Blog({
  blog,
  blogs,
  blogService,
  handleSetNotification,
  handleSetBlogs,
  user,
}) {
  const [showDetails, setShowDetails] = useState(false);

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
      handleSetNotification({
        class: "error",
        message: exception.response.data.error,
      });
      setTimeout(() => {
        handleSetNotification(null);
      }, 5000);
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

      handleSetNotification({
        class: "success",
        message: "Blog deleted",
      });
      setTimeout(() => {
        handleSetNotification(null);
      }, 5000);
    } catch (exception) {
      handleSetNotification({
        class: "error",
        message: "Error deleting blog",
      });
      setTimeout(() => {
        handleSetNotification(null);
      }, 5000);
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
