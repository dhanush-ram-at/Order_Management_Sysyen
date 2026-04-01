import { Table, TableHead, TableRow, TableCell, TableBody, Button, TablePagination, Box, Chip } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" 
import { getOrders, cancelOrder, deleteOrder } from "../services/api"  
import OrderForm from "./OrderForm"                                         
import OrderFilters from "./OrderFilters"                                   
import type { Order, OrderFilters as FilterType } from "../types/order"
import { PAGE_ROUTES } from "../Routes/apiRoutes" 

const DEFAULT_FILTERS: FilterType = {
  page: 1,
  search: "",
  status: "",
  sort: "order_date",
};

function OrderTable() {
  const navigate = useNavigate()

  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<FilterType>(DEFAULT_FILTERS);
  const [openForm, setOpenForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const loadOrders = async () => {
    const res = await getOrders(filters)
    setOrders(res.data.data)
    setTotal(res.data.total)
  };
  useEffect(() => {
    loadOrders()
  }, [filters])

  const handleCreate = () => {
    navigate(PAGE_ROUTES.ORDER_CREATE)
  };

  const handleEdit = (order: Order) => {
    setSelectedOrder(order)
    setOpenForm(true)
  };

  const handleCancel = async (order: Order) => {
    await cancelOrder(order.order_id)
    loadOrders()
  };

  const handleDelete = async (id: number) => {
    await deleteOrder(id)
    loadOrders()
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    setFilters({ ...filters, page: newPage + 1 })
  }

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS)
  }

  return (
    <Box>
      <OrderFilters
        filters={filters}
        setFilters={setFilters}
        onReset={handleReset}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleCreate}>
        Create Order
      </Button>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Order Code</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={order.order_id}>

              <TableCell>{(filters.page - 1) * 10 + index + 1}</TableCell>
              <TableCell>{order.order_code}</TableCell>
              <TableCell>{order.customer_name}</TableCell>
              <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
              <TableCell>{order.product_name}</TableCell>
              <TableCell>₹ {order.price}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>₹ {order.total_amount}</TableCell>
              <TableCell>
                <Chip label={order.order_status}size="small"/>
              </TableCell>

              <TableCell>
                <Button
                  size="small"
                  color="warning"
                  onClick={() => handleCancel(order)}
                  disabled={order.order_status === "Cancelled"}
                  sx={{ mr: 1 }}
                >
                  Cancel
                </Button>

                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleEdit(order)}
                  disabled={order.order_status === "Cancelled"}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(order.order_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={total}
        page={filters.page - 1}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
        onPageChange={handlePageChange}
      />

      
      <OrderForm
        open={openForm}
        setOpen={setOpenForm}
        order={selectedOrder}
        reloadOrders={loadOrders}
      />

    </Box>
  );
}

export default OrderTable





// import { Box, Button, Chip } from "@mui/material"
// import { DataGrid, type GridColDef } from "@mui/x-data-grid"
// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"

// import { getOrders, cancelOrder, deleteOrder } from "../services/api"
// import OrderForm from "./OrderForm"
// import OrderFilters from "./OrderFilters"

// import type { Order, OrderFilters as FilterType } from "../types/order"
// import { PAGE_ROUTES } from "../Routes/apiRoutes"

// const DEFAULT_FILTERS: FilterType = {
//   page: 1,
//   search: "",
//   status: "",
//   sort: "order_date",
// }

// function OrderTable() {
//   const navigate = useNavigate()

//   const [orders, setOrders] = useState<Order[]>([])
//   const [total, setTotal] = useState(0)
//   const [filters, setFilters] = useState<FilterType>(DEFAULT_FILTERS)
//   const [openForm, setOpenForm] = useState(false)
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

//   const loadOrders = async () => {
//     const res = await getOrders(filters)
//     setOrders(res.data.data)
//     setTotal(res.data.total)
//   }

//   useEffect(() => {
//     loadOrders()
//   }, [filters])

//   const handleCreate = () => {
//     navigate(PAGE_ROUTES.ORDER_CREATE)
//   }

//   const handleEdit = (order: Order) => {
//     setSelectedOrder(order)
//     setOpenForm(true)
//   }

//   const handleCancel = async (order: Order) => {
//     await cancelOrder(order.order_id)
//     loadOrders()
//   }

//   const handleDelete = async (id: number) => {
//     await deleteOrder(id)
//     loadOrders()
//   }

//   // ✅ DataGrid Columns
//   const columns: GridColDef[] = [
//     {
//       field: "sno",
//       headerName: "S.No",
//       width: 80,
//       renderCell: (params) =>
//         (filters.page - 1) * 10 + params.api.getRowIndex(params.id) + 1,
//     },
//     { field: "order_code", headerName: "Order Code", width: 150 },
//     { field: "customer_name", headerName: "Customer", width: 150 },
//     {
//       field: "order_date",
//       headerName: "Date",
//       width: 130,
//       renderCell: (params) =>
//         new Date(params.value).toLocaleDateString(),
//     },
//     { field: "product_name", headerName: "Product", width: 150 },
//     {
//       field: "price",
//       headerName: "Price",
//       width: 100,
//       renderCell: (params) => `₹ ${params.value}`,
//     },
//     { field: "quantity", headerName: "Qty", width: 80 },
//     {
//       field: "total_amount",
//       headerName: "Total",
//       width: 120,
//       renderCell: (params) => `₹ ${params.value}`,
//     },
//     {
//       field: "order_status",
//       headerName: "Status",
//       width: 130,
//       renderCell: (params) => (
//         <Chip label={params.value} size="small" />
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 250,
//       sortable: false,
//       renderCell: (params) => {
//         const order = params.row

//         return (
//           <>
//             <Button
//               size="small"
//               color="warning"
//               onClick={() => handleCancel(order)}
//               disabled={order.order_status === "Cancelled"}
//               sx={{ mr: 1 }}
//             >
//               Cancel
//             </Button>

//             <Button
//               size="small"
//               color="primary"
//               onClick={() => handleEdit(order)}
//               disabled={order.order_status === "Cancelled"}
//               sx={{ mr: 1 }}
//             >
//               Edit
//             </Button>

//             <Button
//               size="small"
//               color="error"
//               onClick={() => handleDelete(order.order_id)}
//             >
//               Delete
//             </Button>
//           </>
//         )
//       },
//     },
//   ]

//   return (
//     <Box>
//       <OrderFilters
//         filters={filters}
//         setFilters={setFilters}
//         onReset={() => setFilters(DEFAULT_FILTERS)}
//       />

//       <Button variant="contained" sx={{ mt: 2 }} onClick={handleCreate}>
//         Create Order
//       </Button>

//       {/* ✅ DataGrid */}
//       <Box sx={{ height: 500, mt: 2 }}>
//         <DataGrid
//           rows={orders}
//           columns={columns}
//           getRowId={(row) => row.order_id}
//           rowCount={total}
//           pageSizeOptions={[10]}
//           paginationModel={{ page: filters.page - 1, pageSize: 10 }}
//           paginationMode="server"
//           onPaginationModelChange={(model) =>
//             setFilters({ ...filters, page: model.page + 1 })
//           }
//         />
//       </Box>

//       <OrderForm
//         open={openForm}
//         setOpen={setOpenForm}
//         order={selectedOrder}
//         reloadOrders={loadOrders}
//       />
//     </Box>
//   )
// }

// export default OrderTable