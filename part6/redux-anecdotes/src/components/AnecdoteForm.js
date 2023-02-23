import { React } from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(createAnecdote(content));
    dispatch(setNotification(`A new anecdote was successfully added.`, 5));
  };

  return (
    <>
      <h2>Add an anecdote</h2>
      <form onSubmit={add}>
        <div>
          <input name="content" placeholder="Content of the anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
