const API_ROUTES = {

  BASE: "/api/v1",

  orders: {
    base:   "/orders",          // /api/v1/orders
    by_id:  "/orders/:id",      // /api/v1/orders/:id
  },

  UPLOADS: {
    base: "/uploads",            // /api/v1/uploads
    folder: "uploads/order"      // /api/v1/uploads/orders
  }

};

module.exports = API_ROUTES;