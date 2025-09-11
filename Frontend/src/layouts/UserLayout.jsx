import { Routes, Route, Navigate } from "react-router-dom";
import UserNavbar from "../components/navbars/UserNavbar";
import UserFooter from "../components/footers/UserFooter";
import Dashboard from "../pages/user/Dashboard";
import Profile from "../pages/user/Profile";
import Support from "../pages/user/Support";
import ViewTask from "../pages/user/viewTask";
import Workgroups from "../pages/user/Workgroups";
import ViewGroup from "../pages/user/ViewGroup";

export default function UserLayout() {
  return (
    <div>
      <UserNavbar />
      <main>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="workgroups" element={<Workgroups />} />
          <Route path="support" element={<Support />} />
          <Route path="viewtask/:id" element={<ViewTask />} />
          <Route path="viewgroup/:id" element={<ViewGroup />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
      <UserFooter />
    </div>
  );
}
