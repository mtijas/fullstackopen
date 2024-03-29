import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/loginReducer";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  async function handleLogin(event) {
    event.preventDefault();

    dispatch(login(username, password));

    setUsername("");
    setPassword("");
  }

  function handleLogout(event) {
    event.preventDefault();
    dispatch(logout());
  }

  if (loggedInUser !== null) {
    return (
      <p>
        {loggedInUser.name} logged in
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
