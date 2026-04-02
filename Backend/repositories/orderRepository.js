const orderDAL = require("../DAL/orderDAL");
const APP_CONFIG = require("../constants/appConfig");
const REPO = require("../constants/error_messages/repo");
const { formatOrder, formatOrderList } = require("../DTOs/orderDTO");

// CREATE
const createOrder = async (data) => {
  try {
    const query = { data };
    const raw   = await orderDAL.create(query);
    return formatOrder(raw);
  } catch (error) {
    throw new Error(`${REPO.CREATE_ORDER_FAILED} ${error.message}`);
  }
};

// FIND ALL — builds full query with filters, pagination, sort
const findAllOrders = async (filters, skip, limit, sort) => {
  try {
    const query = {
      where:   filters,
      skip:    skip,
      take:    limit,
      orderBy: { [sort]: APP_CONFIG.SORT.DEFAULT_DIRECTION },
    };
    const rows = await orderDAL.findMany(query);
    return formatOrderList(rows);
  } catch (error) {
    throw new Error(`${REPO.FETCH_ORDERS_FAILED}: ${error.message}`);
  }
};

// COUNT
const countOrders = async (filters) => {
  try {
    const query = { where: filters };
    return await orderDAL.count(query);
  } catch (error) {
    throw new Error(`${REPO.COUNT_ORDERS_FAILED} ${error.message}`);
  }
};

// FIND ONE
const findOrderById = async (id) => {
  try {
    const query = { where: { order_id: id } };
    const raw   = await orderDAL.findUnique(query);
    if (!raw) return null;
    return formatOrder(raw);
  } catch (error) {
    throw new Error(`${REPO.FIND_ORDER_FAILED}: ${error.message}`);
  }
};

// UPDATE
const updateOrderById = async (id, data) => {
  try {
    const query = { where: { order_id: id }, data };
    const raw = await orderDAL.update(query);
    return formatOrder(raw);
  } catch (error) {
    throw new Error(`${REPO.UPDATE_ORDER_FAILED}: ${error.message}`);
  }
};

// SOFT DELETE
const softDeleteOrderById = async (id) => {
  try {
    const query = { where: { order_id: id }, data: { is_deleted: true } };
    await orderDAL.update(query);
  } catch (error) {
    throw new Error(`${REPO.DELETE_ORDER_FAILED}: ${error.message}`);
  }
};

module.exports = { createOrder, findAllOrders, countOrders, findOrderById, updateOrderById, softDeleteOrderById };
