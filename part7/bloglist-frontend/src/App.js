import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogList, Blog } from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import MainNav from "./components/MainNav";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeLoggedInUser } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UsersList, { UserInfo } from "./components/Users";
import Container from "react-bootstrap/Container";

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
      <MainNav />

      <Container id="mainContent">
        <Notification />

        <Routes>
          <Route
            path="/"
            element={loggedInUser ? <BlogList /> : <LoginForm />}
          />
          <Route
            path="/blogs/:id"
            element={loggedInUser ? <Blog /> : <Navigate to="/" />}
          />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserInfo />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
