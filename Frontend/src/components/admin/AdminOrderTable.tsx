import { Box, Chip, Paper } from "@mui/material"
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { getOrders, deleteOrder } from "../../services/api"
import OrderFilters from "./OrderFilters"
import EditOrderDialog from "./EditOrderDialog"
import CancelOrderDialog from "./CancelOrderDialog"
import AppButton from "../common/AppButton"
import type { Order, OrderFilters as FilterType } from "../../types/order"
import { COLORS, STATUS_COLORS } from "../../constants/styles/theme"
import { tableStyles } from "../../constants/styles/tableStyles"

const DEFAULT_FILTERS: FilterType = {
  page: 1, search: "", status: "", sort: "order_date",
}

function AdminOrderTable() {
  const [orders, setOrders] = useState<Order[]>([])
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState<FilterType>(DEFAULT_FILTERS)
  const [openEdit, setOpenEdit] = useState(false)
  const [openCancel, setOpenCancel] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const loadOrders = async () => {
    try {
      const res = await getOrders(filters)
      setOrders(res.data.data)
      setTotal(res.data.total)
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to load orders." })
    }
  }

  useEffect(() => { loadOrders() }, [filters])

  const handleEdit = (order: Order) => {
    setSelectedOrder(order)
    setOpenEdit(true)
  }

  const handleCancelClick = (order: Order) => {
    setSelectedOrder(order)
    setOpenCancel(true)
  }

  const handleDelete = (order: Order) => {
    Swal.fire({
      title: "Delete Order?",
      text: `Order ${order.order_code} will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No",
      confirmButtonColor: COLORS.error,
    }).then(async (result) => {
      if (!result.isConfirmed) return
      try {
        await deleteOrder(order.order_id)
        await Swal.fire({ icon: "success", title: "Deleted!", timer: 1500, showConfirmButton: false })
        loadOrders()
      } catch {
        Swal.fire({ icon: "error", title: "Error", text: "Failed to delete.", confirmButtonColor: COLORS.error })
      }
    })
  }

  const columns: GridColDef[] = [
    {
      field: "sno", headerName: "S.No", width: 70, sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        (filters.page - 1) * 10 + orders.findIndex((o) => o.order_id === params.row.order_id) + 1,
    },
    { field: "order_code",    headerName: "Order Code", width: 140 },
    { field: "customer_name", headerName: "Customer",   width: 140 },
    {
      field: "order_date", headerName: "Date", width: 110,
      renderCell: (params: GridRenderCellParams) =>
        new Date(params.value).toLocaleDateString(),
    },
    { field: "product_name", headerName: "Product", width: 140 },
    {
      field: "price", headerName: "Price", width: 90,
      renderCell: (params: GridRenderCellParams) => `₹ ${params.value}`,
    },
    { field: "quantity", headerName: "Qty", width: 70 },
    {
      field: "total_amount", headerName: "Total", width: 110,
      renderCell: (params: GridRenderCellParams) => `₹ ${params.value}`,
    },
    {
      field: "order_status", headerName: "Status", width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value}
          size="small"
          color={STATUS_COLORS[params.value as string] ?? "default"}
        />
      ),
    },
    {
      field: "actions", headerName: "Actions", width: 240, sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const order = params.row as Order
        return (
          <Box sx={tableStyles.actionCell}>
            <AppButton
              size="small"
              onClick={() => handleEdit(order)}
              disabled={order.order_status === "Cancelled"}
            >
              Edit
            </AppButton>
            <AppButton
              size="small"
              color="warning"
              onClick={() => handleCancelClick(order)}
              disabled={order.order_status === "Cancelled"}
            >
              Cancel
            </AppButton>
            <AppButton
              size="small"
              color="error"
              onClick={() => handleDelete(order)}
            >
              Delete
            </AppButton>
          </Box>
        )
      },
    },
  ]

  return (
    <Box>
      <OrderFilters filters={filters} setFilters={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />

      {/* DataGrid — server-side pagination, uses order_id as row key */}
      <Paper variant="outlined" sx={tableStyles.tablePaper}>
        <DataGrid
          rows={orders}
          columns={columns}
          getRowId={(row) => row.order_id}
          rowCount={total}
          pageSizeOptions={[10]}
          paginationMode="server"
          paginationModel={{ page: filters.page - 1, pageSize: 10 }}
          onPaginationModelChange={(model) =>
            setFilters({ ...filters, page: model.page + 1 })
          }
          disableRowSelectionOnClick
          autoHeight
          sx={tableStyles.dataGrid}
        />
      </Paper>

      <EditOrderDialog   open={openEdit} setOpen={setOpenEdit} order={selectedOrder} reloadOrders={loadOrders} />
      <CancelOrderDialog open={openCancel} setOpen={setOpenCancel} order={selectedOrder} reloadOrders={loadOrders} />
    </Box>
  )
}

export default AdminOrderTable
