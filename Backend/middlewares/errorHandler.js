const STATUS   = require("../constants/statusCodes");
const MESSAGES = require("../constants/messages");

const errorHandler = (err, req, res, next) => {

  console.error("ERROR:", err.message);

  const code    = err.statusCode || STATUS.SERVER_ERROR;
  const message = err.message    || MESSAGES.SERVER.INTERNAL_ERROR;

  res.status(code).json({ message: message });

};

module.exports = errorHandler;