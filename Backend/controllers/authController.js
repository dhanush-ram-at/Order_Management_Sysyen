const authService = require("../services/authService");
const STATUS      = require("../constants/statusCodes");
const AUTH    = require("../constants/error_messages/auth");

// handles HTTP for register
// POST /api/v1/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Basic presence check — specific message per missing field
    if (!name) {
      return res.status(STATUS.BAD_REQUEST).json({ message: AUTH.NAME_REQUIRED });
    }
    if (!email) {
      return res.status(STATUS.BAD_REQUEST).json({ message: AUTH.EMAIL_REQUIRED });
    }
    if (!password) {
      return res.status(STATUS.BAD_REQUEST).json({ message: AUTH.PASSWORD_REQUIRED });
    }

    const user = await authService.register(req.body)
    return res.status(STATUS.CREATED).json({ user });
  }
  
  catch (error) {
    next(error);
  }
};



// handles HTTP for login
// POST /api/v1/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(STATUS.BAD_REQUEST).json({ message: AUTH.EMAIL_REQUIRED });
    }
    if (!password) {
      return res.status(STATUS.BAD_REQUEST).json({ message: AUTH.PASSWORD_REQUIRED });
    }

    const result = await authService.login(req.body);
    return res.status(STATUS.OK).json(result);
  }

  catch (error) {
    next(error);
  }
};

// handles HTTP for refresh
// POST /api/v1/auth/refresh
const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(STATUS.BAD_REQUEST).json({ message: AUTH.TOKEN_REQUIRED });
    }

    const result = await authService.refresh(refreshToken);
    return res.status(STATUS.OK).json(result);
  }
  
  catch (error) {
    next(error);
  }
};


module.exports = { register, login, refresh };