const bcrypt = require("bcrypt");
const authRepo = require("../repositories/authRepository");
const { generateAccessToken, generateRefreshToken, verifyToken } = require("../utils/token");

// to register
const register = async (data) => {
  const existing = await authRepo.getUserByEmail(data.email);
  if (existing) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(data.password, 10);

  const user = await authRepo.createUser({
    name:     data.name,
    email:    data.email,
    password: hashed,
    role:     data.role || "USER",
  });

  return user;
};



// for loging-in
const login = async (data) => {
  const user = await authRepo.getUserByEmail(data.email);
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(data.password, user.password);
  if (!match) throw new Error("Invalid password");

  const payload = { id: user.id, role: user.role };

  return {
    user,
    accessToken:  generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};


// refresh token
const refresh = async (refreshToken) => {
  if (!refreshToken) throw new Error("Token required");

  try {
    const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    return {
      accessToken: generateAccessToken({ id: decoded.id, role: decoded.role }),
    };
  } catch {
    throw new Error("Invalid refresh token");
  }
};

module.exports = { register, login, refresh };
