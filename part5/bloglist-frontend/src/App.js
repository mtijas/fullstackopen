import { useState, useEffect, useRef } from "react";
import { BlogList } from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

      <Notification notification={notification} />

      <LoginForm
        blogService={blogService}
        loginService={loginService}
        user={user}
        handleSetUser={(u) => setUser(u)}
        handleSetNotification={(n) => setNotification(n)}
      />
      <Togglable buttonLabel="Add a new note" ref={blogFormRef}>
        <BlogForm
          blogService={blogService}
          user={user}
          handleSetNotification={(n) => setNotification(n)}
          blogs={blogs}
          handleSetBlogs={(b) => setBlogs(b)}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      {user !== null && (
        <BlogList
          blogs={blogs}
          blogService={blogService}
          handleSetNotification={(n) => setNotification(n)}
          handleSetBlogs={(b) => setBlogs(b)}
          user={user}
        />
      )}
    </div>
  );
};

export default App;
