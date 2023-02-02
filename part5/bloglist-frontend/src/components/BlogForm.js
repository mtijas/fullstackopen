import { useState } from "react";

export default function BlogForm(props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const blog = await props.blogService.create({ author, title, url });
      props.setBlogs(props.blogs.concat(blog));
      setTitle("");
      setAuthor("");
      setUrl("");
      props.setNotification({
        class: "success",
        message: `New blog added: ${blog.title} by ${blog.author}`,
      });
      setTimeout(() => {
        props.setNotification(null);
      }, 5000);
    } catch (exception) {
      props.setNotification({
        class: "error",
        message: exception.response.data.error,
      });
      setTimeout(() => {
        props.setNotification(null);
      }, 5000);
    }
  }

  if (props.user === null) {
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
