import axios from "axios";
const baseUrl = process.env.REACT_APP_BACKEND_BASEURL || "/api/blogs";

let token = null;

function setToken(newToken) {
  token = `Bearer ${newToken}`;
}

function getAll() {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

async function create(newObject) {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
}

async function update(id, newObject) {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
}

async function destroy(id) {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
}

const blogService = {
  getAll,
  create,
  update,
  destroy,
  setToken,
};

export default blogService;
