const express = require("express");
const router = express.Router();

const API_ROUTES = require("../constants/apiRoutes");

const upload = require("../middlewares/upload");
const sanitizeBody = require("../middlewares/sanitize");
const orderController = require("../controllers/orderController");

const { validateCreateOrder, validateUpdateOrder } = require("../validators/orderValidator");

// POST /api/v1/orders
router.post(
  API_ROUTES.orders.base,
  upload.array("files", 3),   // handles file upload
  sanitizeBody,               // clean the text inputs
  validateCreateOrder,        // check all fields are valid
  orderController.createOrder // create the order
);

// GET /api/v1/orders
router.get(
  API_ROUTES.orders.base,
  orderController.getOrders
);

// GET /api/v1/orders/:id
router.get(
  API_ROUTES.orders.by_id,
  orderController.getOrderById
);

// PUT /api/v1/orders/:id
router.put(
  API_ROUTES.orders.by_id,
  upload.array("files", 3),
  sanitizeBody,
  validateUpdateOrder,
  orderController.updateOrder
);

// DELETE /api/v1/orders/:id
router.delete(
  API_ROUTES.orders.by_id,
  orderController.deleteOrder
);

module.exports = router;