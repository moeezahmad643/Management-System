import { Routes, Route, Navigate } from "react-router-dom";
import AdminNavbar from "../components/navbars/AdminNavbar";
import AdminFooter from "../components/footers/AdminFooter";
import Dashboard from "../pages/admin/Dashboard";
import Task from "../pages/admin/Missions";
import Groups from "../pages/admin/Groups";
import Settings from "../pages/admin/Settings";
import ViewTask from "../pages/admin/Components/ViewTask";
import EditGroup from "../pages/admin/Components/EditGroup";

export default function AdminLayout() {
  return (
    <div>
      <AdminNavbar />
      <main>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="task" element={<Task />} />
          <Route path="groups" element={<Groups />} />
          <Route path="settings" element={<Settings />} />
          <Route path="tasks/:id" element={<ViewTask />} />
          <Route path="editgroup/:id" element={<EditGroup />} />

          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
      <AdminFooter />
    </div>
  );
}
