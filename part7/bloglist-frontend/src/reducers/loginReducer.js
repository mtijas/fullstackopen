import { setNotification } from "./notificationReducer";
import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setLoggedInUser(state, action) {
      return action.payload;
    },
    emptyLoggedInUser() {
      return null;
    },
  },
});

export const { setLoggedInUser, emptyLoggedInUser } = userSlice.actions;
export default userSlice.reducer;

export function initializeLoggedInUser() {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setLoggedInUser(user));
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
      dispatch(setLoggedInUser(user));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "error", 5));
    }
  };
}

export function logout() {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(emptyLoggedInUser());
    dispatch(setNotification("Logged out", "success", 5));
  };
}
