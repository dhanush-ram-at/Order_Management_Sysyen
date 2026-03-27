import { Dialog, DialogTitle, DialogContent, TextField, Button, RadioGroup, FormControlLabel, Radio, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { createOrder, updateOrder } from "./../services/api"
import type { Order, OrderFormData } from "./../types/order"

type Props = {
  open:         boolean
  setOpen:      (v: boolean) => void
  order:        Order | null   // null = create mode, Order = edit mode
  reloadOrders: () => void
}

// Default empty form
const EMPTY_FORM: OrderFormData = {
  customer_name:  "",
  product_name:   "",
  order_date:     "",
  price:          "",
  quantity:       "",
  payment_method: "CASH",
  order_status:   "Pending"
}

function OrderForm({ open, setOpen, order, reloadOrders }: Props) {

  const [form, setForm]   = useState<OrderFormData>(EMPTY_FORM)
  const [files, setFiles] = useState<FileList | null>(null)

  // When editing — fill the form with the order's current values
  // When creating — reset to empty
  useEffect(() => {
    if (order) {
      setForm({
        customer_name:  order.customer_name,
        product_name:   order.product_name,
        order_date:     order.order_date?.split("T")[0] || "",
        price:          String(order.price),
        quantity:       String(order.quantity),
        payment_method: order.payment_method,
        order_status:   order.order_status
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [order, open])

  // Update one field in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {

    if (order) {
      // EDIT — send JSON (no files for update)
      await updateOrder(order.order_id, form)
    } else {
      // CREATE — send FormData (has files)
      const data = new FormData()
      Object.keys(form).forEach((key) => {
        data.append(key, form[key as keyof OrderFormData])
      })
      if (files) {
        for (let i = 0; i < files.length; i++) {
          data.append("files", files[i])
        }
      }
      await createOrder(data)
    }

    reloadOrders()
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">

      <DialogTitle>
        {order ? "Edit Order" : "Create Order"}
      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth label="Customer Name" name="customer_name"
          value={form.customer_name} onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth label="Product Name" name="product_name"
          value={form.product_name} onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth label="Order Date" type="date" name="order_date"
          value={form.order_date} onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth label="Price" name="price"
          value={form.price} onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth label="Quantity" name="quantity"
          value={form.quantity} onChange={handleChange}
          sx={{ mt: 2 }}
        />

        {/* Payment method radio buttons */}
        <Typography sx={{ mt: 2 }}>Payment Method</Typography>
        <RadioGroup
          name="payment_method"
          value={form.payment_method}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="CASH" control={<Radio />} label="Cash" />
          <FormControlLabel value="CARD" control={<Radio />} label="Card" />
          <FormControlLabel value="UPI"  control={<Radio />} label="UPI"  />
        </RadioGroup>

        {/* File upload — only for create mode */}
        {!order && (
          <>
            <Typography sx={{ mt: 2 }}>Upload Files (optional)</Typography>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => setFiles(e.target.files)}
            />
          </>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          {order ? "Update Order" : "Place Order"}
        </Button>

      </DialogContent>

    </Dialog>
  )

}

export default OrderForm