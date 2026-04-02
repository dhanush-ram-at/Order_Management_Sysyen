import { Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, FormControlLabel, Radio, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { updateOrder } from "../../services/api"
import AppTextField from "../common/AppTextField"
import AppSelect from "../common/AppSelect"
import AppButton from "../common/AppButton"
import type { Order, OrderFormData } from "../../types/order"
import { COLORS } from "../../constants/styles/theme"
import { dialogStyles } from "../../constants/styles/dialogStyles"

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
  order: Order | null
  reloadOrders: () => void
}

const STATUS_OPTIONS = [
  { value: "Pending", label: "Pending"   },
  { value: "Delivered", label: "Delivered" },
  { value: "Cancelled", label: "Cancelled" },
]

function EditOrderDialog({ open, setOpen, order, reloadOrders }: Props) {
  const [form, setForm] = useState<OrderFormData>({
    customer_name: "", product_name: "", order_date: "",
    price: "", quantity: "", payment_method: "CASH", order_status: "Pending",
  })
  const [errors, setErrors] = useState<Partial<OrderFormData>>({})

  useEffect(() => {
    if (order) {
      setForm({
        customer_name: order.customer_name,
        product_name: order.product_name,
        order_date: order.order_date.slice(0, 10),
        price: String(order.price),
        quantity: String(order.quantity),
        payment_method: order.payment_method,
        order_status: order.order_status,
      })
      setErrors({})
    }
  }, [order, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  const validate = () => {
    const err: Partial<OrderFormData> = {}
    if (!form.customer_name.trim()) err.customer_name = "Customer name is required"
    if (!form.product_name.trim())  err.product_name  = "Product name is required"
    if (!form.order_date) err.order_date = "Order date is required"
    if (!form.price) err.price = "Price is required"
    else if (Number(form.price) <= 0) err.price = "Price must be greater than zero"
    if (!form.quantity) err.quantity = "Quantity is required"
    else if (Number(form.quantity) <= 0) err.quantity = "Quantity must be greater than zero"
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    try {
      await updateOrder(order!.order_id, form)
      await Swal.fire({ icon: "success", title: "Order Updated!", timer: 1500, showConfirmButton: false })
      setOpen(false)
      reloadOrders()
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to update order.", confirmButtonColor: COLORS.error })
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle sx={dialogStyles.editTitle}>Edit Order</DialogTitle>

      <DialogContent>
        <AppTextField label="Customer Name" name="customer_name" value={form.customer_name}
          onChange={handleChange} error={!!errors.customer_name} helperText={errors.customer_name} />
        <AppTextField label="Product Name" name="product_name" value={form.product_name}
          onChange={handleChange} error={!!errors.product_name} helperText={errors.product_name} />
        <AppTextField label="Order Date" name="order_date" type="date" value={form.order_date}
          onChange={handleChange} error={!!errors.order_date} helperText={errors.order_date} />
        <AppTextField label="Price" name="price" value={form.price}
          onChange={handleChange} error={!!errors.price} helperText={errors.price} />
        <AppTextField label="Quantity" name="quantity" value={form.quantity}
          onChange={handleChange} error={!!errors.quantity} helperText={errors.quantity} />

        <Typography sx={dialogStyles.sectionLabel}>Payment Method</Typography>
        <RadioGroup name="payment_method" value={form.payment_method} onChange={handleChange} row>
          <FormControlLabel value="CASH" control={<Radio />} label="Cash" />
          <FormControlLabel value="CARD" control={<Radio />} label="Card" />
          <FormControlLabel value="UPI" control={<Radio />} label="UPI"  />
        </RadioGroup>

        <AppSelect
          label="Order Status"
          value={form.order_status}
          onChange={(val) => setForm({ ...form, order_status: val })}
          options={STATUS_OPTIONS}
        />
      </DialogContent>

      <DialogActions sx={dialogStyles.actions}>
        <AppButton variant="outlined" onClick={() => setOpen(false)}>Back</AppButton>
        <AppButton onClick={handleSave}>Save Changes</AppButton>
      </DialogActions>
    </Dialog>
  )
}

export default EditOrderDialog