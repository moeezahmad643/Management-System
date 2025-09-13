export default function UserFooter() {
  return (
    <footer className="bg-blue-600 text-white py-4 mt-auto">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">
          {/* © {year} User Portal – Secure & Reliable. */}
          © {new Date().getFullYear()} Portail Utilisateur – Sécurisé & Fiable.
        </p>
        <nav className="flex space-x-4 text-sm mt-2 sm:mt-0">
          {/* Dashboard */}
          <a href="/portal/user/dashboard" className="hover:underline">
            Tableau de bord
          </a>
          {/* Profile */}
          <a href="/portal/user/profile" className="hover:underline">
            Profil
          </a>
          {/* Support */}
          <a href="/portal/user/support" className="hover:underline">
            Support
          </a>
        </nav>
      </div>
    </footer>
  );
}