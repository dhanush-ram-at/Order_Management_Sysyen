// One place that defines what an Order looks like
// Use this everywhere instead of "any"

export type Order = {
  order_id:       number
  order_code:     string
  customer_name:  string
  order_date:     string
  product_name:   string
  price:          number
  quantity:       number
  total_amount:   number
  payment_method: string
  order_status:   string
  created_at:     string
}

// What the form holds before submitting
export type OrderFormData = {
  customer_name:  string
  product_name:   string
  order_date:     string
  price:          string
  quantity:       string
  payment_method: string
  order_status:   string
}

// Filters the user can apply
export type OrderFilters = {
  page:     number
  search:   string
  status:   string
  sort:     string
}