// const express = require("express");
// const router = express.Router();

// const API_ROUTES = require("../constants/apiRoutes");

// const upload = require("../middlewares/upload");
// const sanitizeBody = require("../middlewares/sanitize");
// const orderController = require("../controllers/orderController");
// const { protect, authorize  } = require("../middlewares/authMiddleware")
// const { validateCreateOrder, validateUpdateOrder } = require("../validators/orderValidator");

// // POST /api/v1/orders
// router.post(
//   API_ROUTES.orders.base,
//   protect,authorize("USER", "ADMIN"),   // user and admin can create
//   upload.array("files", 3),   // handles file upload
//   sanitizeBody,               // clean the text inputs
//   validateCreateOrder,        // // check all fields are valid
//   orderController.createOrder // create the order
// );

// // GET /api/v1/orders
// router.get(
//   API_ROUTES.orders.base,protect,
//   orderController.getOrders
// );

// // GET /api/v1/orders/:id
// router.get(
//   API_ROUTES.orders.by_id,protect,
//   orderController.getOrderById
// );

// // PUT /api/v1/orders/:id
// router.put(
//   API_ROUTES.orders.by_id,protect,
//   upload.array("files", 3),
//   sanitizeBody,
//   validateUpdateOrder,
//   orderController.updateOrder
// );

// // DELETE - only admin can do    /api/v1/orders/:id
// router.delete(
//   API_ROUTES.orders.by_id,protect,authorize("ADMIN"),
//   orderController.deleteOrder
// );

// module.exports = router;



const express = require("express");
const router = express.Router();

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
  upload.array("files", 3),
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
  upload.array("files", 3),
  sanitizeBody,
  validateUpdateOrder,
  orderController.updateOrder
);

// DELETE /api/v1/orders/:id  — admin only
router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  orderController.deleteOrder
);

module.exports = router;
