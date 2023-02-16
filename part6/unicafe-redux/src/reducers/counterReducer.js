const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

export default function counterReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case "GOOD":
      let good = state.good + 1;
      return { ...state, good };
    case "OK":
      let ok = state.ok + 1;
      return { ...state, ok };
    case "BAD":
      let bad = state.bad + 1;
      return { ...state, bad };
    case "ZERO":
      return initialState;
    default:
      return state;
  }
}

export function addVote(type) {
  return {
    type: type,
  };
}
