const prisma = require("../config/prismaClient");
const DB = require("../constants/error_messages/db");

// to insert a new user row
const create = async (query) => {
  try {
    return await prisma.user.create(query);
  } catch (error) {
    throw new Error(`${DB.CREATE_USER_FAILED}: ${error.message}`);
  }
};


// to select one user by email
const findByEmail = async (query) => {
  try {
    return await prisma.user.findUnique(query);
  } catch (error) {
    throw new Error(`${DB.FIND_USER_BY_EMAIL_FAILED}: ${error.message}`);
  }
};


// to select one user by id
const findById = async (query) => {
  try {
    return await prisma.user.findUnique(query);
  } catch (error) {
    throw new Error(`${DB.FIND_USER_BY_ID_FAILED}: ${error.message}`);
  }
};


module.exports = { create, findByEmail, findById };
