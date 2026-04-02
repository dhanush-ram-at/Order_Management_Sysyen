// Shape of one order from the backend
export type Order = {
  order_id: number
  order_code: string
  customer_name: string
  order_date: string
  product_name: string
  price: number
  quantity: number
  total_amount: number
  payment_method: string
  order_status: string
  remarks: string | null
  user_id: number | null
  created_at: string
}

export type OrderFormData = {
  customer_name: string
  product_name: string
  order_date: string
  price: string
  quantity: string
  payment_method: string
  order_status: string
}

export type OrderFilters = {
  page: number
  search: string
  status: string
  sort: string
}
