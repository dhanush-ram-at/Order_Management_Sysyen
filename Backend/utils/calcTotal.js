const calcTotal = (price, quantity) => {
  return parseFloat(price) * parseInt(quantity);
};

module.exports = calcTotal;