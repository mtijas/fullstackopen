import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/loginReducer";
import { Link } from "react-router-dom";

export default function LoggedInUserInfo() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  function handleLogout(event) {
    event.preventDefault();
    dispatch(logout());
  }

  if (loggedInUser === null) {
    return (
      <p>
        <Link to="/">Log in</Link>
      </p>
    );
  }

  return (
    <p>
      {loggedInUser.name} logged in
      <button onClick={handleLogout}>Log out</button>
    </p>
  );
}
