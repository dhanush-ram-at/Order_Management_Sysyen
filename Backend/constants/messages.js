const MESSAGES = {

  ORDER: {
    CREATED:   "Order created successfully",
    UPDATED:   "Order updated successfully",
    DELETED:   "Order deleted successfully",
    NOT_FOUND: "Order not found",
    FETCH_OK:  "Orders fetched successfully",
  },

  VALIDATION: {
    CUSTOMER_NAME_REQUIRED:  "Customer name is required",
    ORDER_DATE_REQUIRED:     "Order date is required",
    PRODUCT_NAME_REQUIRED:   "Product name is required",
    PRICE_REQUIRED:          "Price is required",
    PRICE_INVALID:           "Price must be greater than zero",
    QUANTITY_REQUIRED:       "Quantity is required",
    QUANTITY_INVALID:        "Quantity must be greater than zero",
    PAYMENT_METHOD_REQUIRED: "Payment method is required",
    ORDER_STATUS_REQUIRED:   "Order status is required",
  },

  AUTH: {
    EMAIL_REQUIRED:        "Email is required",
    PASSWORD_REQUIRED:     "Password is required",
    NAME_REQUIRED:         "Name is required",
    EMAIL_ALREADY_EXISTS:  "Email already exists",
    USER_NOT_FOUND:        "User not found",
    INVALID_PASSWORD:      "Invalid password",
    TOKEN_REQUIRED:        "Token is required",
    INVALID_TOKEN:         "Invalid or expired token",
    NO_TOKEN:              "No token provided. Please log in",
    FORBIDDEN:             "You do not have permission to perform this action",
    REFRESH_TOKEN_INVALID: "Refresh token is invalid or expired",
  },

  ATTACHMENT: {
    SAVE_FAILED: "Failed to save one or more attachments",
  },

  SERVER: {
    INTERNAL_ERROR: "Something went wrong. Please try again later",
  },

};

module.exports = MESSAGES;