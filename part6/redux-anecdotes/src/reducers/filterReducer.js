const reducer = (state = "", action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "UPDATEFILTER":
      return action.filter;
    default:
      return state;
  }
};

export const updateFilter = (filter) => {
  return {
    type: "UPDATEFILTER",
    filter: filter,
  };
};

export default reducer;
