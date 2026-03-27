const STATUS   = require("../constants/statusCodes");
const MESSAGES = require("../constants/messages");

const validateCreateOrder = (req, res, next) => {
    console.log("BODY:", req.body);

  const {
    customer_name,
    order_date,
    product_name,
    price,
    quantity,
    payment_method,
    order_status
  } = req.body;

  // Check all fields exist
  if (
    !customer_name || 
    !order_date || 
    !product_name ||
    !price || 
    !quantity || 
    !payment_method || 
    !order_status
    ) {
    return res.status(STATUS.BAD_REQUEST).json({
      message: MESSAGES.VALIDATION.ALL_FIELDS_REQUIRED
    });
  }

  // Check price and quantity are valid
  if (Number(price) <= 0 || Number(quantity) <= 0) {
    return res.status(STATUS.BAD_REQUEST).json({
      message: MESSAGES.VALIDATION.INVALID_PRICE_QUANTITY
    });
  }

  next();

};


const validateUpdateOrder = (req, res, next) => {

  const { price, quantity } = req.body;

  if (price !== undefined && Number(price) <= 0) {
    return res.status(STATUS.BAD_REQUEST).json({
      message: MESSAGES.VALIDATION.INVALID_PRICE_QUANTITY
    });
  }

  if (quantity !== undefined && Number(quantity) <= 0) {
    return res.status(STATUS.BAD_REQUEST).json({
      message: MESSAGES.VALIDATION.INVALID_PRICE_QUANTITY
    });
  }

  next();

};

module.exports = { validateCreateOrder, validateUpdateOrder };