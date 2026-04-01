import { Box, Typography } from "@mui/material";
import Navbar from "../layouts/Navbar";
import OrderTable from "../components/OrderTable";

function OrderPlacement() {
  return (
    <>
      <Navbar />
      <Box p={3}>
        <Typography variant="h5">Orders Management</Typography>
        <OrderTable />
      </Box>
    </>
  );
}

export default OrderPlacement;