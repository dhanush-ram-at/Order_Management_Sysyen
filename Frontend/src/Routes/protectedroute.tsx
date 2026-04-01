// import { Navigate } from "react-router-dom"

// function ProtectedRoute({ children }: { children: JSX.Element }) {

//   const token = localStorage.getItem("token")

//   if (!token) {
//     return <Navigate to="/login" />
//   }

//   return children
// }

// export default ProtectedRoute










import { Navigate } from "react-router-dom";
import { PAGE_ROUTES } from "./apiRoutes";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={PAGE_ROUTES.LOGIN} replace />;
  }

  return children;
}

export default ProtectedRoute;
