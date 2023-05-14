import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentBlog } from "../reducers/blogReducer";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          name="content"
          onChange={({ target }) => setContent(target.value)}
          placeholder="comment"
        />
        <button type="submit">Add comment</button>
      </form>
    </div>
  );
}
