const ATTACHMENT = require("../constants/error_messages/attachment");
const attachmentDAL = require("../DAL/attachmentDAL");

// add one attachment row
const createAttachment = async (data) => {
  try {
    const query = { data };
    await attachmentDAL.create(query);
  } catch (error) {
    throw new Error(`${ATTACHMENT.SAVE_FAILED}: ${error.message}`);
  }
};


module.exports = { createAttachment };
