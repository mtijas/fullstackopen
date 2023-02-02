import { useState } from "react";

export default function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const user = await props.loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      props.blogService.setToken(user.token);
      props.setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      props.setNotification({
        class: "error",
        message: exception.response.data.error,
      });
      setTimeout(() => {
        props.setNotification(null);
      }, 5000);
    }
  }

  function handleLogout(event) {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    props.setUser(null);
    props.setNotification({
        class: "success",
        message: "Logged out",
      });
    setTimeout(() => {
      props.setNotification(null);
    }, 5000);
  }

  if (props.user !== null) {
    return (
      <p>
        {props.user.name} logged in
        <button onClick={handleLogout}>
          Log out
        </button>
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
