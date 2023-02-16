import { React } from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(addAnecdote(content));
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
