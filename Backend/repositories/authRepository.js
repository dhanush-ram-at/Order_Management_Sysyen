const authDAL = require("../DAL/authDAL")
const REPO = require("../constants/error_messages/repo")


// add a new user
const createUser = async (data) => {
  try {
    const query = { data };
    return await authDAL.create(query);
  } catch (error) {
    throw new Error(`${REPO.CREATE_USER_FAILED}: ${error.message}`);
  }
};


// get user by email
const getUserByEmail = async (email) => {
  try {
    const query = { where: { email } };
    return await authDAL.findByEmail(query);
  } catch (error) {
    throw new Error(`${REPO.FIND_USER_EMAIL_FAILED}: ${error.message}`);
  }
};


// get user by id
const getUserById = async (id) => {
  try {
    const query = { where: { id } };
    return await authDAL.findById(query);
  } catch (error) {
    throw new Error(`${REPO.FIND_USER_ID_FAILED}: ${error.message}`);
  }
};


module.exports = { createUser, getUserByEmail, getUserById };
