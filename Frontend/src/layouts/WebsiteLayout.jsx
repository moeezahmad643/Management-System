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

  const usr = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

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
          {/* Government organization */}
          <h3 className="text-lg font-semibold">Organisation gouvernementale</h3>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {/* Home */}
          <Link to="/">Accueil</Link>
          {/* About */}
          <Link to="/about">À propos</Link>
          {/* Contact */}
          <Link to="/contact">Contact</Link>

          {/* ✅ Show Portal options only if logged in */}
          {loggedIn && (
            <>
              {/* Guide */}
              <Link to="/Guide">Guide</Link>
              {/* Supports */}
              <Link to="/Supports">Soutiens</Link>
              {/* Portal */}
              <Link
                to={`/portal/${usr.role}/dashboard`}
                className="bg-yellow-400 px-2 py-1 rounded text-black"
              >
                Portail
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
          {/* Home */}
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Accueil
          </Link>
          {/* About */}
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            À propos
          </Link>
          {/* Contact */}
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          {/* ✅ Only logged in users see Portal */}
          {loggedIn && (
            <>
              {/* Portal */}
              <Link
                to={`/portal/${usr.role}/dashboard`}
                className="bg-yellow-400 px-2 py-1 rounded text-black"
                onClick={() => setMenuOpen(false)}
              >
                Portail
              </Link>
              {/* Supports */}
              <Link to="/Supports" onClick={() => setMenuOpen(false)}>
                Soutiens
              </Link>
              {/* Guide */}
              <Link to="/Guide" onClick={() => setMenuOpen(false)}>
                Guide
              </Link>
            </>
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

      {/* Footer Section */}
      <section className="bg-gray-900 text-white py-16 px-6 md:px-20 text-center">
        {/* Contact & Emergencies */}
        <h2 className="text-3xl font-bold mb-6">Contact & Urgences</h2>
        {/* General Directorate of the National Police */}
        <p className="mb-4">Direction générale de la Police nationale</p>
        <p className="mb-4">📞 +224 663 89 89 99</p>
        <p className="mb-6">🌐 police-nationale.gov.gn</p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 text-center py-4">
        <div className="space-y-1">
          {/* Guinea National Police — 2025 */}
          <p>Police nationale de Guinée — 2025</p>
          {/* Home */}
          <Link to="/" className="mx-2 hover:underline">
            Accueil
          </Link>
          {/* News */}
          <Link to="/news" className="mx-2 hover:underline">
            Actualités
          </Link>
          {/* Contact */}
          <Link to="/contact" className="mx-2 hover:underline">
            Contact
          </Link>
          {/* Policy */}
          <Link to="/policy" className="mx-2 hover:underline">
            Politique
          </Link>
          {/* Login */}
          <Link to="/portal/login" className="mx-2 hover:underline">
            Connexion
          </Link>
        </div>
      </footer>
    </div>
  );
}