const prisma = require("../config/prismaClient");
const DB = require("../constants/error_messages/db");

// to insert a new order row
const create = async (query) => {
  try {
    return await prisma.order_placement.create(query);
  }
  catch (error) {
    throw new Error(`${DB.CREATE_ORDER_FAILED}: ${error.message}`);
  }
};

// to get many orders with filters, pagination, sorting
const findMany = async (query) => {
  try {
    return await prisma.order_placement.findMany(query);
  }
  catch (error) {
    throw new Error(`${DB.FIND_ORDERS_FAILED}: ${error.message}`);
  }
};

// to count the total matching orders which is used for pagination info
const count = async (query) => {
  try {
    return await prisma.order_placement.count(query);
  }
  catch (error) {
    throw new Error(`${DB.COUNT_ORDERS_FAILED}: ${error.message}`);
  }
};

// to get one order by its ID
const findUnique = async (query) => {
  try {
    return await prisma.order_placement.findUnique(query);
  }
  catch (error) {
    throw new Error(`${DB.FIND_ORDER_BY_ID_FAILED}: ${error.message}`);
  }
};

// to update an order by ID
const update = async (query) => {
  try {
    return await prisma.order_placement.update(query);
  }
  catch (error) {
    throw new Error(`${DB.UPDATE_ORDER_FAILED}: ${error.message}`);
  }
};

// Soft delete —>not deleting the order, but just setting is_deleted as true
const softDeleteOrderByIdDAL = async (query) => {
  try{
    return await prisma.order_placement.update(query);
  }
  catch(error){
     throw new Error(`${DB.DELETE_ORDER_FAILED}: ${error.message}`);
  }
};

module.exports = { create, findMany, count, findUnique, update, softDeleteOrderByIdDAL };
