const orderService = require("../services/orderService");
const { formatOrder, formatOrderList } = require("../DTOs/orderDTO");
const STATUS = require("../constants/statusCodes");
const MESSAGES = require("../constants/messages");

const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body, req.files);
    return res.status(STATUS.CREATED).json({
      message: MESSAGES.ORDER.CREATED,
      order: formatOrder(order),
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const result = await orderService.getOrders(req.query);
    return res.status(STATUS.OK).json({
      message: MESSAGES.ORDER.FETCH_OK,
      page: result.page,
      limit: result.limit,
      total: result.total,
      data: formatOrderList(result.data),
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const order = await orderService.getOrderById(id);
    if (!order) {
      return res.status(STATUS.NOT_FOUND).json({ message: MESSAGES.ORDER.NOT_FOUND });
    }
    return res.status(STATUS.OK).json({
      message: MESSAGES.ORDER.FETCH_OK,
      order: formatOrder(order),
    });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const order = await orderService.updateOrder(id, req.body);
    return res.status(STATUS.OK).json({
      message: MESSAGES.ORDER.UPDATED,
      order: formatOrder(order),
    });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await orderService.deleteOrder(id);
    return res.status(STATUS.OK).json({ message: MESSAGES.ORDER.DELETED });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrder, deleteOrder };