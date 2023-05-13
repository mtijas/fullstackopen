import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogList, Blog } from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LoggedInUserInfo from "./components/LoggedInUserInfo";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeLoggedInUser } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UsersList, { UserInfo } from "./components/Users";

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
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserInfo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
