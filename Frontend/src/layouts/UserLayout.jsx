import { Routes, Route, Navigate } from "react-router-dom";
import UserNavbar from "../components/navbars/UserNavbar";
import UserFooter from "../components/footers/UserFooter";
import Dashboard from "../pages/user/Dashboard";
import Profile from "../pages/user/Profile";
import Missions from "../pages/user/Missions";
import Support from "../pages/user/Support";

export default function UserLayout() {
  return (
    <div>
      <UserNavbar />
      <main>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="missions" element={<Missions />} />
          <Route path="support" element={<Support />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
      <UserFooter />
    </div>
  );
}
