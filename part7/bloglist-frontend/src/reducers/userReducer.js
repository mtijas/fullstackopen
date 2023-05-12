import { setNotification } from "./notificationReducer";
import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser() {
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

export function initializeUser() {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
}

export function login(username, password) {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(setUser(user));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "error", 5));
    }
  };
}

export function logout() {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(removeUser());
    dispatch(setNotification("Logged out", "success", 5));
  };
}
