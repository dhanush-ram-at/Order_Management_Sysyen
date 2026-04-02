import { Box, Typography, Paper } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Navbar from "../layouts/Navbar"
import AppButton from "../components/common/AppButton"
import UserOrderTable from "../components/user/UserOrderTable"
import { PAGE_ROUTES } from "../Routes/apiRoutes"
import { dashboardStyles } from "../constants/styles/dashboardStyles"

function UserDashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  return (
    <>
      <Navbar />
      <Box sx={dashboardStyles.pageWrapper}>

        <Paper variant="outlined" sx={dashboardStyles.welcomeBanner}>
          <Box>
            <Typography variant="h5" sx={dashboardStyles.welcomeTitle}>
              Welcome, {user.name}!
            </Typography>
            <Typography sx={dashboardStyles.welcomeSubtitle}>
              Here are your orders
            </Typography>
          </Box>
          <AppButton
            onClick={() => navigate(PAGE_ROUTES.ORDER_CREATE)}
            sx={dashboardStyles.createButton}
          >
            + Create Order
          </AppButton>
        </Paper>

        <UserOrderTable />

      </Box>
    </>
  )
}

export default UserDashboard