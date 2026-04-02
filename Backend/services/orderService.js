const orderRepository   = require("../repositories/orderRepository");
const { saveAttachments } = require("./attachmentService");
const calcTotal           = require("../utils/calcTotal");
const generateOrderCode   = require("../utils/generateOrderCode");
const APP_CONFIG          = require("../constants/appConfig");
const REPO                = require("../constants/error_messages/repo");
const ORDER               = require("../constants/error_messages/order");

// CREATE
const createOrder = async (input, files) => {
  try {
    const total_amount = calcTotal(input.price, input.quantity);
    const data = {
      ...input,
      order_code:   generateOrderCode(),
      total_amount: total_amount,
    };
    const order = await orderRepository.createOrder(data);
    if (files && files.length > 0) {
      await saveAttachments(order.order_id, files);
    }
    return order;
  } catch (error) {
    throw new Error(`${REPO.CREATE_ORDER_FAILED}: ${error.message}`);
  }
};

// GET ALL — filters by user_id if the logged-in user is USER role
const getOrders = async (query, currentUser) => {
  try {
    const page  = parseInt(query.page) || APP_CONFIG.PAGINATION.DEFAULT_PAGE;
    const limit = APP_CONFIG.PAGINATION.LIMIT;
    const skip  = (page - 1) * limit;
    const sort  = query.sort || APP_CONFIG.SORT.DEFAULT_FIELD;

    // Base filter — never return deleted orders
    const filters = { is_deleted: false };

    // USER role — only see their own orders
    // ADMIN role — see all orders
    if (currentUser.role === "USER") {
      filters.user_id = currentUser.id;
    }

    if (query.customer) {
      filters.customer_name = { contains: query.customer };
    }
    if (query.status) {
      filters.order_status = query.status;
    }

    const orders = await orderRepository.findAllOrders(filters, skip, limit, sort);
    const total  = await orderRepository.countOrders(filters);
    return { page, limit, total, data: orders };
  } catch (error) {
    throw new Error(`${REPO.FETCH_ORDERS_FAILED}: ${error.message}`);
  }
};

// GET ONE
const getOrderById = async (id) => {
  try {
    return await orderRepository.findOrderById(id);
  } catch (error) {
    throw new Error(`${REPO.FETCH_ORDERS_FAILED}: ${error.message}`);
  }
};

// UPDATE
const updateOrder = async (id, input) => {
  try {
    const existingOrder = await orderRepository.findOrderById(id);
    if (!existingOrder) throw new Error(ORDER.NOT_FOUND);
    const finalPrice = input.price  !== undefined ? input.price    : existingOrder.price;
    const finalQuantity = input.quantity !== undefined ? input.quantity : existingOrder.quantity;
    const data = { ...input, total_amount: calcTotal(finalPrice, finalQuantity) };
    return await orderRepository.updateOrderById(id, data);
  } catch (error) {
    throw new Error(`${REPO.UPDATE_ORDER_FAILED}: ${error.message}`);
  }
};

// DELETE
const deleteOrder = async (id) => {
  try {
    await orderRepository.softDeleteOrderById(id);
  } catch (error) {
    throw new Error(`${REPO.DELETE_ORDER_FAILED}: ${error.message}`);
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrder, deleteOrder };
