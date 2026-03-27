// to generates a unique order code like ORD1719000000000
const generateOrderCode = () => {
  return "ORD" + Date.now();
};

module.exports = generateOrderCode;