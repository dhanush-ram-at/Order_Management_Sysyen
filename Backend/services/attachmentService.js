// const attachmentRepository = require("../repositories/attachmentRepository");

// // Loops over uploaded files and saves each one to the DB
// const saveAttachments = async (order_id, files) => {

//   if (!files || files.length === 0) return;

//   for (const file of files) {

//     const data = {
//       order_id:         order_id,
//       file_name:        file.originalname,
//       stored_file_name: file.filename,
//       file_type:        file.mimetype,
//       file_size_kb:     file.size / 1024,
//       file_path:        file.path
//     };
//     await attachmentRepository.createAttachment(data);
//   }
// };

// module.exports = { saveAttachments };








const attachmentRepository = require("../repositories/attachmentRepository");

const saveAttachments = async (order_id, files) => {
  if (!files || files.length === 0) return;

  for (const file of files) {
    await attachmentRepository.createAttachment({
      order_id,
      file_name:        file.originalname,
      stored_file_name: file.filename,
      file_type:        file.mimetype,
      file_size_kb:     file.size / 1024,
      file_path:        file.path,
    });
  }
};

module.exports = { saveAttachments };
