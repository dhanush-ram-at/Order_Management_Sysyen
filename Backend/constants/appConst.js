const APP_CONFIG = {

  // Pagination defaults
  PAGINATION: {
    DEFAULT_PAGE: 1,
    LIMIT:        10,
  },

  // Default sort behaviour for order queries
  SORT: {
    DEFAULT_FIELD:    "created_at",
    DEFAULT_DIRECTION: "desc",
  },

  // File upload settings
  UPLOAD: {
    DIR:           "uploads/order",
    MAX_FILE_SIZE: 2 * 1024 * 1024,   // 2 MB in bytes
    MAX_FILES:     3,
    ALLOWED_TYPES: ["image/jpeg", "image/png", "application/pdf"],
    ALLOWED_LABEL: "JPG, PNG and PDF",
  },

  // Order code generation
  ORDER_CODE_PREFIX: "ORD",

  // Bcrypt hashing rounds
  BCRYPT_ROUNDS: 10,

};

module.exports = APP_CONFIG;
