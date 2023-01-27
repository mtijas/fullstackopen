const logger = require("./logger");

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

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
