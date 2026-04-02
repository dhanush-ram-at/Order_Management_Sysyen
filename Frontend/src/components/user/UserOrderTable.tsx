import { Box, Chip, Paper } from "@mui/material"
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { getOrders, cancelOrder } from "../../services/api"
import type { Order, OrderFilters as FilterType } from "../../types/order"
import { COLORS, STATUS_COLORS } from "../../constants/styles/theme"
import AppButton from "../common/AppButton"
import CancelOrderDialog from "../admin/CancelOrderDialog"
import { tableStyles } from "../../constants/styles/tableStyles"

const DEFAULT_FILTERS: FilterType = {
  page: 1, search: "", status: "", sort: "order_date",
}

function UserOrderTable() {
  const [orders, setOrders] = useState<Order[]>([])
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState<FilterType>(DEFAULT_FILTERS)
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

  const handleCancelClick = (order: Order) => {
    setSelectedOrder(order)
    setOpenCancel(true)
  }

  const columns: GridColDef[] = [
    {
      field: "sno", headerName: "S.No", width: 70, sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        (filters.page - 1) * 10 + orders.findIndex((o) => o.order_id === params.row.order_id) + 1,
    },
    { field: "order_code", headerName: "Order Code", width: 140 },
    { field: "customer_name", headerName: "Customer",   width: 140 },
    {
      field: "order_date", headerName: "Date", width: 110,
      renderCell: (params: GridRenderCellParams) =>
        new Date(params.value).toLocaleDateString(),
    },
    { field: "product_name", headerName: "Product", width: 150 },
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
      // User can only Cancel their own orders — no Edit, no Delete
      field: "actions", headerName: "Actions", width: 120, sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const order = params.row as Order
        return (
          <AppButton
            size="small"
            color="warning"
            onClick={() => handleCancelClick(order)}
            disabled={order.order_status === "Cancelled"}
          >
            Cancel
          </AppButton>
        )
      },
    },
  ]

  return (
    <Box>
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

      <CancelOrderDialog
        open={openCancel}
        setOpen={setOpenCancel}
        order={selectedOrder}
        reloadOrders={loadOrders}
      />
    </Box>
  )
}

export default UserOrderTable
