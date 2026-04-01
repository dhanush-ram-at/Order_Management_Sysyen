const STATUS = require("../constants/statusCodes");
const { verifyToken } = require("../utils/token");

const protect = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(STATUS.UNAUTHORIZED).json({ message: "No token" });

  const token = header.split(" ")[1];

  try {
    const decoded = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(STATUS.UNAUTHORIZED).json({ message: "Invalid token" });
  }
};


// role based - user or admin
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(STATUS.FORBIDDEN).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = { protect, authorize };