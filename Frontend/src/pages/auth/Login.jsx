import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../utils/auth"; // ✅ import des helpers d'authentification

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Réponse de connexion :", data);

      if (!res.ok) {
        setError(data.message || "Identifiants invalides");
        return;
      }

      // ✅ Sauvegarder le token + utilisateur dans localStorage
      login(data.token, data.user);

      // ✅ Redirection selon le rôle
      if (data.user?.role === "admin") {
        navigate("/portal/admin/dashboard", { replace: true });
      } else {
        navigate("/portal/user/dashboard", { replace: true });
      }
    } catch (err) {
      console.error("Erreur de connexion :", err);
      setError("Impossible de se connecter au serveur");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Connexion
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Vous n’avez pas de compte ?{" "}
          <Link
            to="/portal/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;