import { Box, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../layouts/Navbar"
import { createOrder } from "../services/api"
import { PAGE_ROUTES } from "../Routes/apiRoutes"
import type { OrderFormData } from "../types/order"

// Empty form default values
const EMPTY_FORM: OrderFormData = {
    customer_name: "",
    product_name: "",
    order_date: "",
    price: "",
    quantity: "",
    payment_method: "CASH",
    order_status: "Pending"
}

function OrderCreate() {

    const navigate = useNavigate()

    const [form,  setForm]  = useState<OrderFormData>(EMPTY_FORM)
    const [files, setFiles] = useState<FileList | null>(null)

    // Update one field in the form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {

        // Build FormData — needed because we have file uploads
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

        // After create — go back to orders list (page 1)
        navigate(PAGE_ROUTES.DASHBOARD)
    }

    const handleCancel = () => {
        // User clicked cancel — go back without saving
        navigate(PAGE_ROUTES.DASHBOARD)
    }

    return (
        <>
        <Navbar />
        <Box p={3} maxWidth={600}>
            <Typography variant="h5" mb={3}>
                Create Order
            </Typography>

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

            <Typography sx={{ mt: 2 }}>Upload Files (optional)</Typography>
            <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setFiles(e.target.files)}
            />

            {/* Two buttons side by side — Place Order and Cancel */}
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button variant="contained" onClick={handleSubmit} fullWidth>
                    Place Order
                </Button>

                <Button variant="outlined" onClick={handleCancel} fullWidth>
                    Cancel
                </Button>
            </Box>
        </Box>
        </>
    )

}

export default OrderCreate