import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

export default function BlogForm({ blogFormRef }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(createBlog({ author, title, url }));

    setTitle("");
    setAuthor("");
    setUrl("");

    blogFormRef.current.toggleVisibility();
  }

  if (loggedInUser === null) {
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
