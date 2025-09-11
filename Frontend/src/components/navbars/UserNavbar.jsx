import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../utils/auth";
import { Menu, X } from "lucide-react"; // icons for mobile menu

export default function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <Link to="/portal/user/dashboard" className="text-xl font-bold">
          Guardian App
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm">
          <Link to="/portal/user/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/portal/user/missions" className="hover:underline">
            Missions
          </Link>
          <Link to="/portal/user/profile" className="hover:underline">
            Profile
          </Link>
          <Link to="/portal/user/support" className="hover:underline">
            Support
          </Link>
        </div>

        {/* Logout Button (desktop only) */}
        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
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
        <div className="md:hidden flex flex-col gap-4 mt-6  px-6 pb-4  rounded-lg">
          <Link to="/portal/user/dashboard" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link to="/portal/user/missions" onClick={() => setIsOpen(false)}>
            Missions
          </Link>
          <Link to="/portal/user/profile" onClick={() => setIsOpen(false)}>
            Profile
          </Link>
          <Link to="/portal/user/support" onClick={() => setIsOpen(false)}>
            Support
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-1 rounded text-sm mt-2"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}