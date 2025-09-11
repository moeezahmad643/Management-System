import { Navigate } from "react-router-dom";
import { isLoggedIn, getAuth } from "./auth";

function ProtectedRoute({ role, children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/portal/login" replace />;
  }

  const auth = getAuth();

  if (role && auth?.role !== role) {
    // Redirect to correct role dashboard
    return <Navigate to={`/portal/${auth?.role}/dashboard`} replace />;
  }

  return children;
}

export default ProtectedRoute;
