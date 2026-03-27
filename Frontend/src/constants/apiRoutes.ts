const BASE = "http://localhost:5000/api/v1"

export const API_ROUTES = {
  ORDERS: {
    BASE:   `${BASE}/orders`,
    BY_ID:  (id: number) => `${BASE}/orders/${id}`,
  }
}


export const PAGE_ROUTES = {
  ADMIN:        "/",
  ORDER_CREATE: "/create",
}

export default API_ROUTES