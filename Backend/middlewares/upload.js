const multer = require("multer");
const path   = require("path");
const APP_CONFIG = require("../constants/appConfig");
const DB = require("../constants/error_messages/db");

const storage = multer.diskStorage({
  // Save files to the folder defined in APP_CONFIG
  destination: (req, file, cb) => {
    cb(null, APP_CONFIG.UPLOAD.DIR);
  },

  // Name file with timestamp + original extension
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (APP_CONFIG.UPLOAD.ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Only ${APP_CONFIG.UPLOAD.ALLOWED_LABEL} files are allowed`), false);
  }
};

const upload = multer({
  storage,
  limits:     { fileSize: APP_CONFIG.UPLOAD.MAX_FILE_SIZE },
  fileFilter,
});

module.exports = upload;
