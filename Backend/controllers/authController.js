const authService = require("../services/authService");
const STATUS = require("../constants/statusCodes");
const MESSAGES = require("../constants/messages");

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(STATUS.CREATED).json(user);
  } catch (err) {
    res.status(STATUS.BAD_REQUEST).json({ message: MESSAGES.AUTH.BAD_REQUEST });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(STATUS.UNAUTHORIZED).json({ message: MESSAGES.AUTH.UNAUTHORIZED });
  }
};

const refresh = async (req, res) => {
  try {
    const result = await authService.refresh(req.body.refreshToken);
    res.json(result);
  } catch (err) {
    res.status(STATUS.UNAUTHORIZED).json({ message: MESSAGES.AUTH.UNAUTHORIZED });
  }
};

module.exports = { register, login, refresh };
