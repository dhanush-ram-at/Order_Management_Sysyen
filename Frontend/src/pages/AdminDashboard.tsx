import { Box, Typography } from "@mui/material"
import Navbar from "../layouts/Navbar"
import AdminOrderTable from "../components/admin/AdminOrderTable"
import { dashboardStyles } from "../constants/styles/dashboardStyles"

function AdminDashboard() {
  return (
    <>
      <Navbar />
      <Box sx={dashboardStyles.pageWrapper}>
        <Typography variant="h5" sx={dashboardStyles.pageTitle}>
          All Orders
        </Typography>
        <AdminOrderTable />
      </Box>
    </>
  )
}

export default AdminDashboard