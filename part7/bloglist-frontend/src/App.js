import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { BlogList } from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedBlogs = await blogService.getAll();
        setBlogs(fetchedBlogs);
      } catch (exception) {
        console.error(`Error getting initial data: '${exception}'`);
        dispatch(
          setNotification(
            `Error getting initial data: '${exception}'`,
            "error",
            5
          )
        );
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      <LoginForm
        blogService={blogService}
        loginService={loginService}
        user={user}
        handleSetUser={(u) => setUser(u)}
      />
      <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
        <BlogForm
          blogService={blogService}
          user={user}
          blogs={blogs}
          handleSetBlogs={(b) => setBlogs(b)}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      {user !== null && (
        <BlogList
          blogs={blogs}
          blogService={blogService}
          handleSetBlogs={(b) => setBlogs(b)}
          user={user}
        />
      )}
    </div>
  );
};

export default App;
