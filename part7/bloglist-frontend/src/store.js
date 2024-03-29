import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    loggedInUser: loginReducer,
    users: usersReducer,
  },
});
