import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

export default function BlogForm({
  blogService,
  user,
  blogs,
  handleSetBlogs,
  blogFormRef,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

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

      dispatch(
        setNotification(
          `New blog added: ${blog.title} by ${blog.author}`,
          "success",
          5
        )
      );
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "error", 5));
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
            placeholder="title"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
