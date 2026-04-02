const BASE = "http://localhost:5000/api/v1"

export const API_ROUTES = {
  AUTH: {
    LOGIN:`${BASE}/auth/login`,
    REGISTER: `${BASE}/auth/register`,
    REFRESH: `${BASE}/auth/refresh`,
  },
  ORDERS: {
    BASE:  `${BASE}/orders`,
    BY_ID: (id: number) => `${BASE}/orders/${id}`,
  },
}

export const PAGE_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  ADMIN_DASHBOARD: "/admin",
  USER_DASHBOARD: "/user",
  ORDER_CREATE: "/create",
}

export default API_ROUTES
