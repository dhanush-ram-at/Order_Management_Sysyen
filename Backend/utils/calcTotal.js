const calcTotal = (price, quantity) => {
  return parseFloat(price) * parseInt(quantity);
};

const re_calcTotal = (finalPrice, finalQuantity) => {
  return parseFloat(finalPrice) * parseInt(finalQuantity);
};

module.exports = {calcTotal, re_calcTotal};