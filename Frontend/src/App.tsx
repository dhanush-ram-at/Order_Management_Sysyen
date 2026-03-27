import { Routes, Route } from "react-router-dom"
import OrderPlacement from "../src/pages/orderPlacement"
import OrderCreate    from "./pages/OrderCreate"
import { PAGE_ROUTES } from "./constants/apiRoutes"

function App() {
  return (
    <Routes>
      <Route path={PAGE_ROUTES.ADMIN}        element={<OrderPlacement />} />
      <Route path={PAGE_ROUTES.ORDER_CREATE} element={<OrderCreate />}   />
    </Routes>
  )
}

export default App