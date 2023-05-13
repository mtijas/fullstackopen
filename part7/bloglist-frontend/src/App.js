import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlogList } from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      <LoginForm />
      <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      {loggedInUser !== null && <BlogList />}
    </div>
  );
};

export default App;
