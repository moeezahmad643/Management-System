import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import { Menu, X } from "lucide-react";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-gray-100 px-6 py-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/portal/admin/dashboard" className="text-xl font-bold text-white">
          Admin Panel
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm">
          <Link to="/portal/admin/dashboard" className="hover:text-blue-400">
            Dashboard
          </Link>
          <Link to="/portal/admin/task" className="hover:text-blue-400">
            Task
          </Link>
          <Link to="/portal/admin/groups" className="hover:text-blue-400">
            Groups
          </Link>
          <Link to="/portal/admin/settings" className="hover:text-blue-400">
            Settings
          </Link>
        </div>

        {/* Desktop Logout */}
        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-6 px-6 pb-4  rounded-lg">
          <Link to="/portal/admin/dashboard" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link to="/portal/admin/task" onClick={() => setIsOpen(false)}>
            Task
          </Link>
          <Link to="/portal/admin/groups" onClick={() => setIsOpen(false)}>
            Groups
          </Link>
          <Link to="/portal/admin/settings" onClick={() => setIsOpen(false)}>
            Settings
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm mt-2"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}