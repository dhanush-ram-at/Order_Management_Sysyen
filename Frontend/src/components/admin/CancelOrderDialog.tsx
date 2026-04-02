import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { cancelOrder } from "../../services/api"
import AppSelect from "../common/AppSelect"
import AppButton from "../common/AppButton"
import type { Order } from "../../types/order"
import { COLORS } from "../../constants/styles/theme"
import { dialogStyles } from "../../constants/styles/dialogStyles"

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
  order: Order | null
  reloadOrders: () => void
}

const REASON_OPTIONS = [
  { value: "Customer requested cancellation", label: "Customer requested cancellation" },
  { value: "Payment failed", label: "Payment failed" },
  { value: "Item out of stock", label: "Item out of stock" },
  { value: "Duplicate order", label: "Duplicate order" },
  { value: "Others", label: "Others" },
]

function CancelOrderDialog({ open, setOpen, order, reloadOrders }: Props) {
  const [reason, setReason] = useState("")
  const [customReason, setCustomReason] = useState("")
  const [reasonErr, setReasonErr] = useState("")

  useEffect(() => {
    if (open) { setReason(""); setCustomReason(""); setReasonErr("") }
  }, [open])

  const handleClose = () => {
    setReason(""); setCustomReason(""); setReasonErr("")
    setOpen(false)
  }

  const handleConfirm = async () => {
    if (!reason) { setReasonErr("Please select a reason"); return }
    if (reason === "Others" && !customReason.trim()) {
      setReasonErr("Please enter a reason"); return
    }

    const finalReason = reason === "Others" ? customReason : reason

    const result = await Swal.fire({
      title: "Cancel Order?",
      text: `Reason: ${finalReason}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "Go Back",
      confirmButtonColor: COLORS.error,
    })

    if (!result.isConfirmed) return

    try {
      await cancelOrder(order!.order_id, finalReason)
      await Swal.fire({
        icon: "success", title: "Order Cancelled",
        timer: 1500, showConfirmButton: false,
      })
      handleClose()
      reloadOrders()
    } catch {
      Swal.fire({ icon: "error", title: "Failed", text: "Could not cancel order.", confirmButtonColor: COLORS.error })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={dialogStyles.cancelTitle}>
        Cancel Order
      </DialogTitle>

      <DialogContent>
        {order && (
          <Typography sx={dialogStyles.orderInfoText}>
            Order: <strong>{order.order_code}</strong> — {order.customer_name}
          </Typography>
        )}

        <AppSelect
          label="Reason for Cancellation"
          value={reason}
          onChange={(val) => { setReason(val); setReasonErr(""); setCustomReason("") }}
          options={REASON_OPTIONS}
          error={!reason ? reasonErr : ""}
        />

        {reason === "Others" && (
          <TextField
            fullWidth multiline rows={3}
            label="Enter reason"
            value={customReason}
            onChange={(e) => { setCustomReason(e.target.value); setReasonErr("") }}
            error={!!reasonErr && reason === "Others"}
            helperText={reason === "Others" ? reasonErr : ""}
            sx={dialogStyles.customReasonField}
          />
        )}
      </DialogContent>

      <DialogActions sx={dialogStyles.actions}>
        <AppButton variant="outlined" onClick={handleClose}>Back</AppButton>
        <AppButton color="error" onClick={handleConfirm}>Cancel Order</AppButton>
      </DialogActions>
    </Dialog>
  )
}

export default CancelOrderDialog
