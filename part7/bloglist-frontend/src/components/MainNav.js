import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/loginReducer";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export default function LoggedInUserInfo() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);

  function handleLogout(event) {
    event.preventDefault();
    dispatch(logout());
  }

  const loggedInUserInfo = loggedInUser ? (
    <>
      <span className="navbar-text">{loggedInUser.name} logged in</span>
      <Button onClick={handleLogout} variant="link">
        Log out
      </Button>
    </>
  ) : (
    <Link to="/">Log in</Link>
  );

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Blogs
            </Link>
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </Nav>
          {loggedInUserInfo}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
