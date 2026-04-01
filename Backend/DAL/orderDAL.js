const prisma = require("../config/prismaClient");

// to insert a new order row
const createOrderDAL = async (data) => {
  const order = await prisma.order_placement.create(data);
  return order;
};

// to get many orders with filters, pagination, sorting
const findAllOrdersDAL = async (filters, skip, limit, sort) => {
  const orders = await prisma.order_placement.findMany({
    where:   filters,
    skip:    skip,
    take:    limit,
    orderBy: { [sort]: "desc" }
  });
  return orders;
};

// to count the total matching orders which is used for pagination info
const countOrdersDAL = async (filters) => {
  const total = await prisma.order_placement.count({ where: filters });
  return total;
};

// to get one order by its ID
const findOrderByIdDAL = async (id) => {
  const order = await prisma.order_placement.findUnique({
    where: { order_id: id }
  });
  return order;
};

// to update an order by ID
const updateOrderByIdDAL = async (id, data) => {
  return await prisma.order_placement.update({
    where: { order_id: id },
    data:  data
  });
  
};

// Soft delete —>not deleting the order, but just setting is_deleted as true
const softDeleteOrderByIdDAL = async (id) => {
  await prisma.order_placement.update({
    where: { order_id: id },
    data:  { is_deleted: true }
  });
};

module.exports = { createOrderDAL, findAllOrdersDAL, countOrdersDAL, findOrderByIdDAL, updateOrderByIdDAL, softDeleteOrderByIdDAL };
