import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  hideNotification,
} from "../reducers/notificationReducer";

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const vote = (id, content) => {
    console.log("vote", id);
    dispatch(voteAnecdote(id));
    dispatch(showNotification(`You voted '${content}'`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);
  return sortedAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content)}>
          vote
        </button>
      </div>
    </div>
  ));
};

export default Anecdotes;
