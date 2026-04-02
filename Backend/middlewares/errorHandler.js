const STATUS = require("../constants/statusCodes");
const SERVER = require("../constants/error_messages/server")

const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err.message);
  const code = err.statusCode || STATUS.SERVER_ERROR;
  const message = err.message || SERVER.INTERNAL_ERROR;
  res.status(code).json({ message });
};

module.exports = errorHandler;
