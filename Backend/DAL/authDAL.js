const prisma = require("../config/prismaClient")

const createUser = (data) => {
  return prisma.user.create({ data })
}

const findUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } })
}

const findUserById = (id) => {
  return prisma.user.findUnique({ where: { id } })
}

module.exports = { createUser, findUserByEmail, findUserById }

