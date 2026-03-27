// we are use it so we never accidentally send private DB fields (like is_deleted) to the frontend

const formatOrder = (order) => {
  return {
    order_id:       order.order_id,
    order_code:     order.order_code,
    customer_name:  order.customer_name,
    order_date:     order.order_date,
    product_name:   order.product_name,
    price:          parseFloat(order.price),
    quantity:       order.quantity,
    total_amount:   parseFloat(order.total_amount),
    payment_method: order.payment_method,
    order_status:   order.order_status,
    created_at:     order.created_at,
  };
  // is_deleted, updated_by, created_by are NOT included
  // The frontend never needs to see those internal fields
};

const formatOrderList = (orders) => {
  return orders.map(formatOrder);
};

module.exports = { formatOrder, formatOrderList };