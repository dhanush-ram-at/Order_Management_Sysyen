const authService = require("../services/authService");
const { STATUS, STATUS_TEXT } = require("../constants/statusCodes");
const AUTH = require("../constants/error_messages/auth");
// handles HTTP for register
// POST /api/v1/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(STATUS.BAD_REQUEST).json({
        code:    STATUS.BAD_REQUEST,
        status:  STATUS_TEXT[STATUS.BAD_REQUEST],
        message: AUTH.NAME_REQUIRED,
      });
    }
    if (!email) {
      return res.status(STATUS.BAD_REQUEST).json({
        code:    STATUS.BAD_REQUEST,
        status:  STATUS_TEXT[STATUS.BAD_REQUEST],
        message: AUTH.EMAIL_REQUIRED,
      });
    }
    // Email format validation — must contain @ and a dot after @
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(STATUS.BAD_REQUEST).json({
        code:    STATUS.BAD_REQUEST,
        status:  STATUS_TEXT[STATUS.BAD_REQUEST],
        message: AUTH.EMAIL_INVALID_FORMAT,
      });
    }
    if (!password) {
      return res.status(STATUS.BAD_REQUEST).json({
        code:    STATUS.BAD_REQUEST,
        status:  STATUS_TEXT[STATUS.BAD_REQUEST],
        message: AUTH.PASSWORD_REQUIRED,
      });
    }

    const user = await authService.register(req.body);
    return res.status(STATUS.CREATED).json({
      code:    STATUS.CREATED,
      status:  STATUS_TEXT[STATUS.CREATED],
      message: AUTH.REGISTERATION_SUCCESSFUL,
      user,
    });
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
      return res.status(STATUS.BAD_REQUEST).json({
        code:    STATUS.BAD_REQUEST,
        status:  STATUS_TEXT[STATUS.BAD_REQUEST],
        message: AUTH.EMAIL_REQUIRED,
      });
    }
    if (!password) {
      return res.status(STATUS.BAD_REQUEST).json({
        code:    STATUS.BAD_REQUEST,
        status:  STATUS_TEXT[STATUS.BAD_REQUEST],
        message: AUTH.PASSWORD_REQUIRED,
      });
    }

    const result = await authService.login(req.body);
    return res.status(STATUS.OK).json({
      code:   STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: AUTH.LOGIN_SUCCESS,
      ...result,
    });
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
      return res.status(STATUS.BAD_REQUEST).json({
        code:    STATUS.BAD_REQUEST,
        status:  STATUS_TEXT[STATUS.BAD_REQUEST],
        message: AUTH.TOKEN_REQUIRED,
      });
    }

    const result = await authService.refresh(refreshToken);
    return res.status(STATUS.OK).json({
      code:   STATUS.OK,
      status: STATUS_TEXT[STATUS.OK],
      message: AUTH.REFRESH_TOKEN_REFRESH,
      ...result,
    });
  }

  catch (error) {
    next(error);
  }
};

module.exports = { register, login, refresh };