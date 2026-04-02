const API_ROUTES = {
  BASE: "/api/v1",

  AUTH: {
    register: "/api/v1/auth/register",
    login: "/api/v1/auth/login",
    refresh: "/api/v1/auth/refresh",
  },

  ORDERS: {
    base:  "/api/v1/orders",
    by_id: "/api/v1/orders/:id",
  },

  UPLOADS: {
    serve: "/uploads",       // static file serving mount
    dir: "uploads/order",  // folder on disk
  },
};

module.exports = API_ROUTES;