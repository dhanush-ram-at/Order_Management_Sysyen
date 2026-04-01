import { Routes, Route, Navigate } from "react-router-dom";
import HandleLogin    from "./pages/login";
import OrderPlacement from "./pages/orderPlacement";
import OrderCreate    from "./pages/OrderCreate";
import ProtectedRoute from "./Routes/protectedroute";
import { PAGE_ROUTES } from "./Routes/apiRoutes";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Root → redirect based on auth */}
      <Route
        path="/"
        element={<Navigate to={token ? PAGE_ROUTES.DASHBOARD : PAGE_ROUTES.LOGIN} replace />}
      />

      {/* Login page — if already logged in, go straight to dashboard */}
      <Route
        path={PAGE_ROUTES.LOGIN}
        element={token ? <Navigate to={PAGE_ROUTES.DASHBOARD} replace /> : <HandleLogin />}
      />

      {/* Protected: orders dashboard */}
      <Route
        path={PAGE_ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <OrderPlacement />
          </ProtectedRoute>
        }
      />

      {/* Protected: create order page */}
      <Route
        path={PAGE_ROUTES.ORDER_CREATE}
        element={
          <ProtectedRoute>
            <OrderCreate />
          </ProtectedRoute>
        }
      />

      {/* Catch-all → login */}
      <Route path="*" element={<Navigate to={PAGE_ROUTES.LOGIN} replace />} />
    </Routes>
  );
}

export default App;
