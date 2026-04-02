const prisma = require("../config/prismaClient");
const DB = require("../constants/error_messages/db");

// to insert a new attachment row
const create = async (query) => {
  try {
    await prisma.order_attachments.create(query);
  }
  catch (error) {
    throw new Error(`${DB.SAVE_ATTACHMENT_FAILED}: ${error.message}`);
  }
};


module.exports = { create };
