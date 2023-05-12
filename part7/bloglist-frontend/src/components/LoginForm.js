import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

export default function LoginForm({
  loginService,
  blogService,
  user,
  handleSetUser,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      handleSetUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "error", 5));
    }
  }

  function handleLogout(event) {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    handleSetUser(null);
    dispatch(setNotification("Logged out", "success", 5));
  }

  if (user !== null) {
    return (
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Log out</button>
      </p>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  loginService: PropTypes.object.isRequired,
  blogService: PropTypes.object.isRequired,
  handleSetUser: PropTypes.func.isRequired,
  user: PropTypes.object,
};
