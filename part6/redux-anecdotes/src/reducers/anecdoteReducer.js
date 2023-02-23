import anecdoteService from "../services/anecdotes";
import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    patchAnecdote(state, action) {
      return state.map((a) =>
        a.id === action.payload.id ? action.payload : a
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { patchAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const patchedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const result = await anecdoteService.patch(patchedAnecdote);
    dispatch(patchAnecdote(result));
  };
};

export default anecdoteSlice.reducer;
