import { useState, useEffect } from "react";
import { BlogList } from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

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
        setUser={setUser}
        setNotification={setNotification}
      />
      <BlogForm
        blogService={blogService}
        user={user}
        setNotification={setNotification}
        blogs={blogs}
        setBlogs={setBlogs}
      />
      {user !== null && BlogList(blogs)}
    </div>
  );
};

export default App;
