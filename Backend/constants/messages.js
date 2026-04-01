const MESSAGES = {
  ORDER: {
    CREATED:   "Order created successfully",
    UPDATED:   "Order updated successfully",
    DELETED:   "Order deleted successfully",
    NOT_FOUND: "Order not found",
    FETCH_OK:  "Orders fetched successfully",
  },

  VALIDATION: {
    ALL_FIELDS_REQUIRED:    "All fields are required",
    INVALID_PRICE_QUANTITY: "Price and quantity must be greater than zero",
  },

  SERVER: {
    INTERNAL_ERROR: "Something went wrong. Please try again later",
  },

  AUTH: {
    BAD_REQUEST: "Invalid request. Please check your data",
    UNAUTHORIZED: "Access denied. Please log in"

  }
};

module.exports = MESSAGES;
