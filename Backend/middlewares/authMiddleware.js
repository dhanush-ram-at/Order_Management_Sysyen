const STATUS = require("../constants/statusCodes");
const AUTH = require("../constants/error_messages/auth")//const MESSAGES = require("../constants/error_messages/db");
const { verifyToken } = require("../utils/token");

//verifies JWT access (Bearer) token on every protected route
const protect = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(STATUS.UNAUTHORIZED).json({
      message: AUTH.NO_TOKEN,
    });
  }

  // Header format: "Bearer eyJhbGci..."
  const token = header.split(" ")[1];

  try {
    const decoded = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; 
    next();
  } catch {
    return res.status(STATUS.UNAUTHORIZED).json({
      message: AUTH.INVALID_TOKEN,
    });
  }
};


// Checks that the authenticated user has one of the allowed roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(STATUS.FORBIDDEN).json({
        message: AUTH.FORBIDDEN,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };