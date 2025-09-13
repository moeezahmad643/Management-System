export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-6">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-2">Page non trouvée</h2>
      <p className="text-gray-400 mb-6 max-w-md">
        Désolé, la page que vous cherchez n’existe pas ou a été déplacée.
      </p>
      <a
        href="/"
        className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
      >
        Retour à l’accueil
      </a>
    </div>
  );
}