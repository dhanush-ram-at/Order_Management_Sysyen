// const BASE = "http://localhost:5000/api/v1"

// export const API_ROUTES = {
//   ORDERS: {
//     BASE:   `${BASE}/orders`,
//     BY_ID:  (id: number) => `${BASE}/orders/${id}`,
//   }
// }


// export const PAGE_ROUTES = {
//   Login: "/login",
//   ADMIN: "/front",
//   ORDER_CREATE: "/create",
// }


// export default API_ROUTES












const BASE = "http://localhost:5000/api/v1";

// ── API routes (backend endpoints) ──────────────────────────────────────────
export const API_ROUTES = {
  AUTH: {
    LOGIN:   `${BASE}/auth/login`,
    REGISTER:`${BASE}/auth/register`,
    REFRESH: `${BASE}/auth/refresh`,
  },
  ORDERS: {
    BASE:   `${BASE}/orders`,
    BY_ID:  (id: number) => `${BASE}/orders/${id}`,
  },
};

// ── Page routes (React Router paths) ────────────────────────────────────────
export const PAGE_ROUTES = {
  LOGIN:        "/login",
  DASHBOARD:    "/dashboard",
  ORDER_CREATE: "/create",
};

export default API_ROUTES;
