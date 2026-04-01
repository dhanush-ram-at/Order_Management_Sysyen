import axios from "axios"
import API_ROUTES from "../Routes/apiRoutes"
import type { OrderFilters, OrderFormData } from "../types/order"

export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1"
})

// add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
});

// Auto-refresh token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(API_ROUTES.AUTH.REFRESH, { refreshToken });
        localStorage.setItem("token", res.data.accessToken);
        original.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(original);
      } catch {
        // Refresh failed — clear storage and redirect to login
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;



// to get all the orders — with page, search, status, sort
export const getOrders = (filters: OrderFilters) => {
  return api.get(API_ROUTES.ORDERS.BASE, {
    params: {
      page:     filters.page,
      customer: filters.search,  // backend reads "customer" param
      status:   filters.status,
      sort:     filters.sort,
    },
  });
};

// to create order — FormData because it has file uploads
export const createOrder = (data: FormData) => {
  return api.post(API_ROUTES.ORDERS.BASE, data);
}

// to update the order — JSON, no files
export const updateOrder = (id: number, data: Partial<OrderFormData>) => {
  return api.put(API_ROUTES.ORDERS.BY_ID(id), data);
}

// to cancel the order — just sets order_status to Cancelled
// Reuses updateOrder — no need for a separate API call
export const cancelOrder = (id: number) => {
  return api.put(API_ROUTES.ORDERS.BY_ID(id), {
    order_status: "Cancelled"
  })
}

// to delete the order — soft delete on backend
export const deleteOrder = (id: number) => {
  return api.delete(API_ROUTES.ORDERS.BY_ID(id))
}