import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, isLoggedIn } from "./utils/auth";

import WebsiteLayout from "./layouts/WebsiteLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/admin/Dashboard";
import UserDashboard from "./pages/user/Dashboard";

function App() {
  const { role } = getAuth() || {};

  return (
    <Routes>
      {/* Public Website */}
      <Route path="/*" element={<WebsiteLayout />} />

      {/* Portal Auth */}
      <Route path="/portal/login" element={<Login />} />
      <Route path="/portal/register" element={<Register />} />

      {/* Portal redirect root */}
      <Route
        path="/portal"
        element={
          isLoggedIn() ? (
            <Navigate to={`/portal/${role}/dashboard`} replace />
          ) : (
            <Navigate to="/portal/login" replace />
          )
        }
      />

      {/* Admin Portal */}
      <Route
        path="/portal/admin/*"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/* User Portal */}
      <Route
        path="/portal/user/*"
        element={
          <ProtectedRoute role="user">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<UserDashboard />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
