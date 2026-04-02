const generateOrderCode = require("../utils/generateOrderCode");

// request DTO
const toCreateOrderInput = (body, userId) => ({
  customer_name:  body.customer_name,
  order_date:     new Date(body.order_date),
  product_name:   body.product_name,
  price:          parseFloat(body.price),
  quantity:       parseInt(body.quantity),
  payment_method: body.payment_method,
  order_status:   body.order_status,
  user_id:        userId || null,   // link order to the logged-in user
});

const toUpdateOrderInput = (body) => {
  const input = {};
  if (body.customer_name !== undefined) input.customer_name  = body.customer_name;
  if (body.order_date  !== undefined) input.order_date  = new Date(body.order_date);
  if (body.product_name !== undefined) input.product_name = body.product_name;
  if (body.price !== undefined) input.price   = parseFloat(body.price);
  if (body.quantity !== undefined) input.quantity = parseInt(body.quantity);
  if (body.payment_method !== undefined) input.payment_method = body.payment_method;
  if (body.order_status !== undefined) input.order_status = body.order_status;
  if (body.remarks !== undefined) input.remarks   = body.remarks;
  return input;
};

// response DTO
const formatOrder = (order) => ({
  order_id: order.order_id,
  order_code: order.order_code,
  customer_name: order.customer_name,
  order_date:  order.order_date,
  product_name:  order.product_name,
  price: parseFloat(order.price),
  quantity:  order.quantity,
  total_amount: parseFloat(order.total_amount),
  payment_method: order.payment_method,
  order_status: order.order_status,
  remarks: order.remarks || null,   // cancellation reason
  user_id: order.user_id  || null,
  created_at: order.created_at,
});

const formatOrderList = (orders) => orders.map(formatOrder);

module.exports = { toCreateOrderInput, toUpdateOrderInput, formatOrder, formatOrderList };
