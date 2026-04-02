const APP_CONFIG = require("../constants/appConfig");

// to generates a unique order code like ORD1719000000000
const generateOrderCode = () => {
  return APP_CONFIG.ORDER_CODE_PREFIX + Date.now();
};

module.exports = generateOrderCode;