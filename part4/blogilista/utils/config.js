require("dotenv").config();

let PORT = process.env.PORT || 3003;
let MONGODB_URL = process.env.MONGODB_URL;

module.exports = {
  PORT,
  MONGODB_URL,
};
