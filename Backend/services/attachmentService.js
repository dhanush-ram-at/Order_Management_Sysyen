const attachmentRepository = require("../repositories/attachmentRepository");
const ATTACHMENT = require("../constants/error_messages/attachment")
const saveAttachments = async (order_id, files) => {
  try {
    if (!files || files.length === 0) return;

    for (const file of files) {
      await attachmentRepository.createAttachment({
        order_id,
        file_name: file.originalname,
        stored_file_name: file.filename,
        file_type: file.mimetype,
        file_size_kb: file.size / 1024,
        file_path: file.path,
      });
    }

  } catch (error) {
    throw new Error(`${ATTACHMENT.SAVE_FAILED}: ${error.message}`);
  }
};

module.exports = { saveAttachments };
