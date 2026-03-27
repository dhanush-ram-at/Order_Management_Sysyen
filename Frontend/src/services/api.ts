import axios from "axios"
import API_ROUTES from "../constants/apiRoutes"
import type { OrderFilters, OrderFormData } from "../types/order"

// GET all orders — with page, search, status, sort
export const getOrders = (filters: OrderFilters) => {
  return axios.get(API_ROUTES.ORDERS.BASE, {
    params: {
      page:     filters.page,
      customer: filters.search,  // backend reads "customer" param
      status:   filters.status,
      sort:     filters.sort,
    }
  })
}

// CREATE order — FormData because it has file uploads
export const createOrder = (data: FormData) => {
  return axios.post(API_ROUTES.ORDERS.BASE, data)
}

// UPDATE order — JSON, no files
export const updateOrder = (id: number, data: Partial<OrderFormData>) => {
  return axios.put(API_ROUTES.ORDERS.BY_ID(id), data)
}

// CANCEL order — just sets order_status to Cancelled
// Reuses updateOrder — no need for a separate API call
export const cancelOrder = (id: number) => {
  return axios.put(API_ROUTES.ORDERS.BY_ID(id), {
    order_status: "Cancelled"
  })
}

// DELETE order — soft delete on backend
export const deleteOrder = (id: number) => {
  return axios.delete(API_ROUTES.ORDERS.BY_ID(id))
}