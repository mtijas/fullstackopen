import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter(state, action) {
      console.log("state now: ", JSON.parse(JSON.stringify(state)));
      return action.payload;
    },
  },
});

export const { updateFilter } = filterSlice.actions;
export default filterSlice.reducer;
