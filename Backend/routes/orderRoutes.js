const express = require("express");
const router = express.Router();
const APP_CONFIG = require("../constants/appConfig");
const upload = require("../middlewares/upload");
const sanitizeBody = require("../middlewares/sanitize");
const orderController = require("../controllers/orderController");
const { protect, authorize } = require("../middlewares/authMiddleware");
const { validateCreateOrder, validateUpdateOrder } = require("../validators/orderValidator");

// POST /api/v1/orders
router.post(
  "/",
  protect,
  authorize("USER", "ADMIN"),
  upload.array("files", APP_CONFIG.UPLOAD.MAX_FILES),
  sanitizeBody,
  validateCreateOrder,
  orderController.createOrder
);

// GET /api/v1/orders
router.get(
  "/",
  protect,
  orderController.getOrders
);

// GET /api/v1/orders/:id
router.get(
  "/:id",
  protect,
  orderController.getOrderById
);

// PUT /api/v1/orders/:id
router.put(
  "/:id",
  protect,
  upload.array("files", APP_CONFIG.UPLOAD.MAX_FILES),
  sanitizeBody,
  validateUpdateOrder,
  orderController.updateOrder
);

// DELETE /api/v1/orders/:id
router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  orderController.deleteOrder
);

module.exports = router;
