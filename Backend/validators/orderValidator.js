const STATUS   = require("../constants/statusCodes");
const VALIDATION = require("../constants/error_messages/validation");

const validateCreateOrder = (req, res, next) => {

  const {
    customer_name,
    order_date,
    product_name,
    price,
    quantity,
    payment_method,
    order_status
  } = req.body;

    // Check each required field individually
  if (!customer_name) {
    return res.status(STATUS.BAD_REQUEST).json({ 
      message: VALIDATION.CUSTOMER_NAME_REQUIRED });
  }

  if (!order_date) {
    return res.status(STATUS.BAD_REQUEST).json({ 
      message: VALIDATION.ORDER_DATE_REQUIRED });
  }

  if (!product_name) {
    return res.status(STATUS.BAD_REQUEST).json({ 
      message: VALIDATION.PRODUCT_NAME_REQUIRED });
  }

  if (!price) {
    return res.status(STATUS.BAD_REQUEST).json({ 
      message: VALIDATION.PRICE_REQUIRED });
  }

  if (Number(price) <= 0) {
    return res.status(STATUS.BAD_REQUEST).json({ 
      message: VALIDATION.PRICE_INVALID });
  }

  if (!quantity) {
    return res.status(STATUS.BAD_REQUEST).json({ 
      message: VALIDATION.QUANTITY_REQUIRED });
  }

  if (Number(quantity) <= 0) {
    return res.status(STATUS.BAD_REQUEST).json({ 
      message: VALIDATION.QUANTITY_INVALID });
  }

  if (!payment_method) {
    return res.status(STATUS.BAD_REQUEST).json({ 
      message: VALIDATION.PAYMENT_METHOD_REQUIRED });
  }

  if (!order_status) {
    return res.status(STATUS.BAD_REQUEST).json({ 
      message: VALIDATION.ORDER_STATUS_REQUIRED });
  }

  next();
};


const validateUpdateOrder = (req, res, next) => {
  const { price, quantity } = req.body;
  if (price !== undefined && Number(price) <= 0) {
    return res.status(STATUS.BAD_REQUEST).json({
      message: VALIDATION.PRICE_INVALID });
  }

  if (quantity !== undefined && Number(quantity) <= 0) {
    return res.status(STATUS.BAD_REQUEST).json({
      message: VALIDATION.QUANTITY_INVALID });
  }

  next();
};


module.exports = { validateCreateOrder, validateUpdateOrder };