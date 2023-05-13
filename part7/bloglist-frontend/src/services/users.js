import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_BASEURL
  ? `${process.env.REACT_APP_BACKEND_BASEURL}/api/users`
  : "/api/users";

let token = null;

function setToken(newToken) {
  token = `Bearer ${newToken}`;
}

async function getAll() {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
}

const usersService = {
  getAll,
  setToken,
};

export default usersService;
