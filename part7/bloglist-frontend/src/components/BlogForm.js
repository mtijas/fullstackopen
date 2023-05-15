import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    <Form onSubmit={handleSubmit}>
      <h2>Create new</h2>
      <Form.Group controlId="newBlogFormTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder="title"
        />
      </Form.Group>
      <Form.Group controlId="newBlogFormAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="author"
        />
      </Form.Group>
      <Form.Group controlId="newBlogFormURL">
        <Form.Label>URL</Form.Label>
        <Form.Control
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder="url"
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Create
      </Button>
    </Form>
  );
}
