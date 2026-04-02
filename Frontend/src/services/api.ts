import axios from "axios"
import API_ROUTES from "../Routes/apiRoutes"
import type { OrderFilters, OrderFormData } from "../types/order"

export const api = axios.create({
  baseURL: "http://localhost:5000",
})

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refreshToken = localStorage.getItem("refreshToken")
        const res = await axios.post(API_ROUTES.AUTH.REFRESH, { refreshToken })
        localStorage.setItem("token", res.data.accessToken)
        original.headers.Authorization = `Bearer ${res.data.accessToken}`
        return api(original)
      } catch {
        localStorage.clear()
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)

export default api

// Auth
export const registerUser = (data: { name: string; email: string; password: string }) =>
  axios.post(API_ROUTES.AUTH.REGISTER, { ...data, role: "USER" })

// Orders
export const getOrders = (filters: OrderFilters) =>
  api.get(API_ROUTES.ORDERS.BASE, {
    params: {
      page: filters.page,
      customer: filters.search,
      status: filters.status,
      sort: filters.sort,
    },
  })

// Create uses FormData because backend uses multer for file uploads
export const createOrder = (data: FormData) =>
  api.post(API_ROUTES.ORDERS.BASE, data)

export const updateOrder = (id: number, data: Partial<OrderFormData>) =>
  api.put(API_ROUTES.ORDERS.BY_ID(id), data)

// Cancel sends the reason in remarks field
export const cancelOrder = (id: number, reason: string) =>
  api.put(API_ROUTES.ORDERS.BY_ID(id), { order_status: "Cancelled", remarks: reason })

export const deleteOrder = (id: number) =>
  api.delete(API_ROUTES.ORDERS.BY_ID(id))
