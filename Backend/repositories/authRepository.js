const authDAL = require("../DAL/authDAL")

const createUser = (data) => authDAL.createUser(data)
const getUserByEmail = (email) => authDAL.findUserByEmail(email)
const getUserById = (id) => authDAL.findUserById(id)

module.exports = { createUser, getUserByEmail, getUserById }