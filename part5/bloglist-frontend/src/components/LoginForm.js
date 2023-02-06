import { useState } from "react";

export default function LoginForm({
  loginService,
  blogService,
  user,
  handleSetUser,
  handleSetNotification,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      handleSetNotification({
        class: "error",
        message: exception.response.data.error,
      });
      setTimeout(() => {
        handleSetNotification(null);
      }, 5000);
    }
  }

  function handleLogout(event) {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    handleSetUser(null);
    handleSetNotification({
        class: "success",
        message: "Logged out",
      });
    setTimeout(() => {
      handleSetNotification(null);
    }, 5000);
  }

  if (user !== null) {
    return (
      <p>
        {user.name} logged in
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
