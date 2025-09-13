export default function AdminFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mt-auto">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p className="text-sm">
          {/* © {year} Admin Panel – All rights reserved. */}
          © {new Date().getFullYear()} Panneau d'administration – Tous droits réservés.
        </p>
        <nav className="flex space-x-4 text-sm">
          {/* Dashboard */}
          <a href="/portal/admin/dashboard" className="hover:text-white">
            Tableau de bord
          </a>
          {/* Settings */}
          <a href="/portal/admin/settings" className="hover:text-white">
            Paramètres
          </a>
          {/* Missions */}
          <a href="/portal/admin/missions" className="hover:text-white">
            Missions
          </a>
        </nav>
      </div>
    </footer>
  );
}