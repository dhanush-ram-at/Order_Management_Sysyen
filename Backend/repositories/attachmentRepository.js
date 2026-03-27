const prisma = require("../config/prismaClient");

const createAttachment = async (data) => {
  await prisma.order_attachments.create({ data: data });
};

module.exports = { createAttachment };