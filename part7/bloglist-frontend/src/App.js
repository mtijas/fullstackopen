import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogList } from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LoggedInUserInfo from "./components/LoggedInUserInfo";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeLoggedInUser } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import UsersList from "./components/Users";

const App = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeLoggedInUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        <LoggedInUserInfo />
      </div>
      <h1>Blogs</h1>

      <Notification />

      <Routes>
        <Route path="/" element={loggedInUser ? <BlogList /> : <LoginForm />} />
        <Route
          path="/users"
          element={loggedInUser ? <UsersList /> : <Navigate replace to={"/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
