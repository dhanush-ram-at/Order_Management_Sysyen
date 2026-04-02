const bcrypt = require("bcrypt");
const authRepo = require("../repositories/authRepository");
const APP_CONFIG = require("../constants/appConfig");
const AUTH = require("../constants/error_messages/auth")
const { generateAccessToken, generateRefreshToken, verifyToken } = require("../utils/token");

// to register
const register = async (data) => {
  try {
    const existing = await authRepo.getUserByEmail(data.email);
    if (existing) {
      throw new Error(AUTH.EMAIL_ALREADY_EXISTS);
    }

    // Hash password using rounds from APP_CONFIG
    const hashed = await bcrypt.hash(data.password, APP_CONFIG.BCRYPT_ROUNDS);
    const user = await authRepo.createUser({
      name:  ata.name,
      email: data.email,
      password: hashed,
      role:  data.role || "USER",
    });
    return user;

  }
  catch (error) {
    throw new Error(`${AUTH.REGISTERATION_FAILED}: ${error.message}`);
  }
};



// for loging-in
const login = async (data) => {
  try {
    const user = await authRepo.getUserByEmail(data.email);
    if (!user) {
      throw new Error(AUTH.USER_NOT_FOUND);
    }

    const match = await bcrypt.compare(data.password, user.password);
    if (!match) {
      throw new Error(AUTH.INVALID_PASSWORD);
    }

    const payload = { id: user.id, role: user.role };
    return {
      user,
      accessToken:  generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
    };

  }
  catch (error) {
    throw new Error(`${AUTH.LOGIN_FAILED}: ${error.message}`);
  }
};


// refresh token
const refresh = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new Error(AUTH.TOKEN_REQUIRED);
    }

    const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    return {
      accessToken: generateAccessToken({ id: decoded.id, role: decoded.role }),
    };

  }
  catch (error) {
    throw new Error(`${AUTH.REFRESH_TOKEN_INVALID}: ${error.message}`);
  }
};

module.exports = { register, login, refresh };
