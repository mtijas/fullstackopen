import { React } from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  hideNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newAnecdote));
    dispatch(showNotification(`A new anecdote was successfully added.`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
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
