const orderService = require("../services/orderService");
const STATUS       = require("../constants/statusCodes");
const { toCreateOrderInput, toUpdateOrderInput } = require("../DTOs/orderDTO");
const ORDER = require("../constants/error_messages/order");

// POST /api/v1/orders
const createOrder = async (req, res, next) => {
  try {
    // pass req.user.id so the order is linked to the logged-in user
    const input = toCreateOrderInput(req.body, req.user.id);
    const order = await orderService.createOrder(input, req.files);
    return res.status(STATUS.CREATED).json({ message: ORDER.CREATED, order });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/orders
const getOrders = async (req, res, next) => {
  try {
    // pass req.user so service can filter by user_id for USER role
    const result = await orderService.getOrders(req.query, req.user);
    return res.status(STATUS.OK).json({
      message: ORDER.FETCH_OK,
      page:    result.page,
      limit:   result.limit,
      total:   result.total,
      data:    result.data,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/orders/:id
const getOrderById = async (req, res, next) => {
  try {
    const id    = parseInt(req.params.id);
    const order = await orderService.getOrderById(id);
    if (!order) {
      return res.status(STATUS.NOT_FOUND).json({ message: ORDER.NOT_FOUND });
    }
    return res.status(STATUS.OK).json({ message: ORDER.FETCH_OK, order });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/orders/:id
const updateOrder = async (req, res, next) => {
  try {
    const id    = parseInt(req.params.id);
    const input = toUpdateOrderInput(req.body);
    const order = await orderService.updateOrder(id, input);
    return res.status(STATUS.OK).json({ message: ORDER.UPDATED, order });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/orders/:id
const deleteOrder = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await orderService.deleteOrder(id);
    return res.status(STATUS.OK).json({ message: ORDER.DELETED });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrder, deleteOrder };
