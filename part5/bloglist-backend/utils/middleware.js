const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

function requestLogger(request, response, next) {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
}

function unknownEndpoint(request, response, next) {
  response.status(404).send({ error: "unknown endpoint" });
  next();
}

function errorHandler(error, request, response, next) {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformed id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "token missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(400).json({ error: "token expired" });
  }
  next(error);
}

function tokenExtractor(request, response, next) {
  const authorization = request.get("authorization");
  request.token = null;
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
}

async function userExtractor(request, response, next) {
  if (!request.token) {
    next();
    return;
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  request.user = await User.findById(decodedToken.id);
  next();
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
