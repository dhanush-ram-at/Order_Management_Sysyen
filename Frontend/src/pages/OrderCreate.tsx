import { Box, Typography, RadioGroup, FormControlLabel, Radio, Paper } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import Navbar from "../layouts/Navbar"
import { createOrder } from "../services/api"
import { PAGE_ROUTES } from "../Routes/apiRoutes"
import AppTextField from "../components/common/AppTextField"
import AppButton from "../components/common/AppButton"
import { COLORS } from "../constants/styles/theme"
import { orderCreateStyles } from "../constants/styles/orderCreateStyles"

function OrderCreate() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    customer_name: "",
    product_name: "",
    order_date: "",
    price: "",
    quantity: "",
    payment_method: "CASH",
    order_status:"Pending",
  })

  const [files, setFiles] = useState<FileList | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  const validate = () => {
    const err: Record<string, string> = {}
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

  const handleSubmit = async () => {
    if (!validate()) return

    const data = new FormData()
    Object.keys(form).forEach((key) => {
      data.append(key, form[key as keyof typeof form])
    })
    if (files) {
      for (let i = 0; i < files.length; i++) {
        data.append("files", files[i])
      }
    }

    try {
      await createOrder(data)
      await Swal.fire({
        icon: "success", title: "Order Placed!",
        text: "Your order has been created successfully.",
        timer: 1800, showConfirmButton: false,
      })
      navigate(PAGE_ROUTES.USER_DASHBOARD)
    } catch (err: any) {
      Swal.fire({
        icon: "error", title: "Order Failed",
        text: err?.response?.data?.message || "Something went wrong. Please try again.",
        confirmButtonColor: COLORS.error,
      })
    }
  }

  return (
    <>
      <Navbar />
      <Box sx={orderCreateStyles.pageWrapper}>
        <Paper sx={orderCreateStyles.formCard}>

          <Typography variant="h5" sx={orderCreateStyles.formTitle}>
            Create Order
          </Typography>

          <AppTextField label="Customer Name" name="customer_name" value={form.customer_name}
            onChange={handleChange} error={!!errors.customer_name} helperText={errors.customer_name} />

          <AppTextField label="Product Name" name="product_name" value={form.product_name}
            onChange={handleChange} error={!!errors.product_name} helperText={errors.product_name} />

          <AppTextField label="Order Date" name="order_date" type="date" value={form.order_date}
            onChange={handleChange} error={!!errors.order_date} helperText={errors.order_date} />

          <AppTextField label="Price (₹)" name="price" value={form.price}
            onChange={handleChange} error={!!errors.price} helperText={errors.price} />

          <AppTextField label="Quantity" name="quantity" value={form.quantity}
            onChange={handleChange} error={!!errors.quantity} helperText={errors.quantity} />

          <Typography sx={orderCreateStyles.sectionLabel}>Payment Method</Typography>
          <RadioGroup name="payment_method" value={form.payment_method} onChange={handleChange} row>
            <FormControlLabel value="CASH" control={<Radio />} label="Cash" />
            <FormControlLabel value="CARD" control={<Radio />} label="Card" />
            <FormControlLabel value="UPI"  control={<Radio />} label="UPI"  />
          </RadioGroup>

          <Typography sx={orderCreateStyles.sectionLabel}>Upload Files (optional)</Typography>
          <input type="file" multiple accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => setFiles(e.target.files)} />

          <Box sx={orderCreateStyles.buttonRow}>
            <AppButton fullWidth onClick={handleSubmit}>Place Order</AppButton>
            <AppButton fullWidth variant="outlined" onClick={() => navigate(PAGE_ROUTES.USER_DASHBOARD)}>
              Back
            </AppButton>
          </Box>

        </Paper>
      </Box>
    </>
  )
}

export default OrderCreate