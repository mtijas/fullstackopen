import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentBlog } from "../reducers/blogReducer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function CommentForm({ blog }) {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(commentBlog(blog, { content }));

    setContent("");
  }

  if (loggedInUser === null) {
    return;
  }

  return (
    <Form onSubmit={handleSubmit} className="row g-3">
      <Form.Group controlId="newBlogFormTitle" className="col-auto">
        <Form.Control
          type="text"
          value={content}
          name="content"
          onChange={({ target }) => setContent(target.value)}
          placeholder="comment"
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="col-auto">
        Add comment
      </Button>
    </Form>
  );
}
