import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import AdminDashboard from "./pages/AdminDashboard"
import UserDashboard from "./pages/UserDashboard"
import OrderCreate from "./pages/OrderCreate"
import ProtectedRoute from "./Routes/protectedroute"
import { PAGE_ROUTES } from "./Routes/apiRoutes"

function App() {
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const home = () => {
    if (!token) return PAGE_ROUTES.LOGIN
    return user.role === "ADMIN" ? PAGE_ROUTES.ADMIN_DASHBOARD : PAGE_ROUTES.USER_DASHBOARD
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={home()} replace />} />
      <Route path={PAGE_ROUTES.LOGIN} element={token ? <Navigate to={home()} replace /> : <Login />} />
      <Route path={PAGE_ROUTES.REGISTER} element={<Register />} />

      <Route path={PAGE_ROUTES.ADMIN_DASHBOARD}
        element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />

      <Route path={PAGE_ROUTES.USER_DASHBOARD}
        element={<ProtectedRoute role="USER"><UserDashboard /></ProtectedRoute>} />

      <Route path={PAGE_ROUTES.ORDER_CREATE}
        element={<ProtectedRoute role="USER"><OrderCreate /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to={PAGE_ROUTES.LOGIN} replace />} />
    </Routes>
  )
}

export default App
