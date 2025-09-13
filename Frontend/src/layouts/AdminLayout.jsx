import { Routes, Route, Navigate } from "react-router-dom";
import AdminNavbar from "../components/navbars/AdminNavbar";
import AdminFooter from "../components/footers/AdminFooter";
import Dashboard from "../pages/admin/Dashboard";
import Task from "../pages/admin/Missions";
import Groups from "../pages/admin/Groups";
import Settings from "../pages/admin/Settings";
import ViewTask from "../pages/admin/Components/ViewTask";
import EditGroup from "../pages/admin/Components/EditGroup";
import Users from "../pages/admin/Users";
import Tasks from "../pages/admin/Tasks";
import Group from "../pages/admin/Group";
import ViewSupports from "../pages/admin/ViewSupports";
import Supports from "../pages/admin/Supports";
import ViewGroup from "../pages/admin/ViewGroup";
import AddMessageInGroup from "../pages/admin/AddMessageInGroup";

export default function AdminLayout() {
  return (
    <div>
      <AdminNavbar />
      <main>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="task" element={<Task />} />
          <Route path="tasks" element={<Tasks/>} />
          <Route path="groups" element={<Groups />} />
          <Route path="group" element={<Group />} />
          <Route path="supports" element={<Supports />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-message/:id" element={<AddMessageInGroup />} />
          <Route path="tasks/:id" element={<ViewTask />} />
          <Route path="viewgroup/:id" element={<ViewGroup />} />
          <Route path="supports/:id" element={<ViewSupports />} />
          <Route path="editgroup/:id" element={<EditGroup />} />

          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
      <AdminFooter />
    </div>
  );
}
