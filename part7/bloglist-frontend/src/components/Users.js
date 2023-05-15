import { React } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function UsersList() {
  const users = useSelector((state) => state.users);

  return (
    <article>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export function UserInfo() {
  const users = useSelector((state) => state.users);
  const id = useParams().id;
  const user = users.filter((u) => u.id === id);

  if (user.length === 0) {
    return (
      <article>
        <p>User not found.</p>
      </article>
    );
  }

  return (
    <article>
      <h1>{user[0].name}</h1>
      <h2>Added blogs</h2>
      <ul>
        {user[0].blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </article>
  );
}
