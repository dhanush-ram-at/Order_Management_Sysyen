import { Navigate } from "react-router-dom"
import { PAGE_ROUTES } from "./apiRoutes"

type Props = {
  children: JSX.Element
  role?: "ADMIN" | "USER"
}

function ProtectedRoute({ children, role }: Props) {
  const token = localStorage.getItem("token")
  const user  = JSON.parse(localStorage.getItem("user") || "{}")

  if (!token) return <Navigate to={PAGE_ROUTES.LOGIN} replace />

  if (role && user.role !== role) {
    const correct = user.role === "ADMIN" ? PAGE_ROUTES.ADMIN_DASHBOARD : PAGE_ROUTES.USER_DASHBOARD
    return <Navigate to={correct} replace />
  }

  return children
}

export default ProtectedRoute
