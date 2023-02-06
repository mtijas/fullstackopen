import { useState } from "react";

export default function BlogForm({
  blogService,
  user,
  blogs,
  handleSetBlogs,
  handleSetNotification,
  blogFormRef,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const blog = await blogService.create({ author, title, url });
      blog.user = user;
      handleSetBlogs(blogs.concat(blog));
      setTitle("");
      setAuthor("");
      setUrl("");

      blogFormRef.current.toggleVisibility();

      handleSetNotification({
        class: "success",
        message: `New blog added: ${blog.title} by ${blog.author}`,
      });
      setTimeout(() => {
        handleSetNotification(null);
      }, 5000);
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

  if (user === null) {
    return;
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
