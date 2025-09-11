import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { isLoggedIn } from "../utils/auth";

import Home from "../pages/website/Home";
import About from "../pages/website/About";
import Services from "../pages/website/Services";
import Supports from "../pages/website/Supports";
import Guide from "../pages/website/Guide";
import Contact from "../pages/website/Contact";

export default function WebsiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const loggedIn = isLoggedIn();

  const usr = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-800 text-white p-4 flex justify-between items-center">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo-removebg-preview.png"
            alt="Police Logo"
            className="h-10"
          />
          <h3 className="text-lg font-semibold">Government organization</h3>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {/* ✅ Show Portal options only if logged in */}
          {loggedIn && (
            <>
              <Link to="/Guide">Guide</Link>
              <Link to="/Supports">Supports</Link>
              <Link
                to={`/portal/${usr.role}/dashboard`}
                className="bg-yellow-400 px-2 py-1 rounded text-black"
              >
                Portal
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-blue-700 text-white flex flex-col space-y-2 p-4">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>
            Citizen Services
          </Link>
          <Link to="/Supports" onClick={() => setMenuOpen(false)}>
            Supports
          </Link>
          <Link to="/Guide" onClick={() => setMenuOpen(false)}>
            Guide
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          {/* ✅ Only logged in users see Portal */}
          {loggedIn && (
            <Link
              to={`/portal/${usr.role}/dashboard`}
              className="bg-yellow-400 px-2 py-1 rounded text-black"
              onClick={() => setMenuOpen(false)}
            >
              Portal
            </Link>
          )}
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/Supports" element={<Supports />} />
          <Route path="/Guide" element={<Guide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <section className="bg-gray-900 text-white py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Contact & Emergencies</h2>
        <p className="mb-4">General Directorate of the National Police</p>
        <p className="mb-4">📞 +224 663 89 89 99</p>
        <p className="mb-6">🌐 police-nationale.gov.gn</p>
      </section>

      <footer className="bg-gray-800 text-gray-300 text-center py-4">
        <div className="space-y-1">
          <p>Guinea National Police — 2025</p>
          <Link to="/" className="mx-2 hover:underline">
            Home
          </Link>
          <Link to="/news" className="mx-2 hover:underline">
            News
          </Link>
          <Link to="/contact" className="mx-2 hover:underline">
            Contact
          </Link>
          <Link to="/policy" className="mx-2 hover:underline">
            Policy
          </Link>
          <Link to="/portal/login" className="mx-2 hover:underline">
            Login
          </Link>
        </div>
      </footer>
    </div>
  );
}
