export default function AdminFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mt-auto">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Admin Panel – All rights reserved.
        </p>
        <nav className="flex space-x-4 text-sm">
          <a href="/portal/admin/dashboard" className="hover:text-white">
            Dashboard
          </a>
          <a href="/portal/admin/settings" className="hover:text-white">
            Settings
          </a>
          <a href="/portal/admin/missions" className="hover:text-white">
            Missions
          </a>
        </nav>
      </div>
    </footer>
  );
}