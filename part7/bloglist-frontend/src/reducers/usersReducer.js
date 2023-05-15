import usersService from "../services/users";
import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    emptyUsers() {
      return [];
    },
  },
});

export const { setUsers, emptyUsers } = usersSlice.actions;
export default usersSlice.reducer;

export function initializeUsers() {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll();
      dispatch(setUsers(users));
    } catch (exception) {
      console.error(`Error getting initial users data: '${exception}'`);
      dispatch(
        setNotification(
          `Error getting initial users data: '${exception}'`,
          "danger",
          5
        )
      );
    }
  };
}
