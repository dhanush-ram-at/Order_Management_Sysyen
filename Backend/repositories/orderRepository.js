const orderDAL = require("../DAL/orderDAL")

// to insert a new order row
const createOrder = async (data) => {
  const order = await orderDAL.createOrderDAL({ data: data });
  return order;
};

// to get many orders with filters, pagination, sorting
const findAllOrders = async (filters, skip, limit, sort) => {
  const orders = await orderDAL.findAllOrdersDAL(filters, skip, limit, sort);
  
  return orders;
};

// to count the total matching orders which is used for pagination info
const countOrders = async (filters) => {
  const total = await orderDAL.countOrdersDAL(filters);
  return total;
};

// to get one order by its ID
const findOrderById = async (id) => {
  const order = await orderDAL.findOrderByIdDAL(id)
  return order;
};

// to update an order by ID
const updateOrderById = async (id, data) => {
  return await orderDAL.updateOrderByIdDAL(id, data)
  
};

// Soft delete —>not deleting the order, but just setting is_deleted as true
const softDeleteOrderById = async (id) => {
  await orderDAL.softDeleteOrderByIdDAL(id)
};

module.exports = { createOrder, findAllOrders, countOrders, findOrderById, updateOrderById, softDeleteOrderById };
