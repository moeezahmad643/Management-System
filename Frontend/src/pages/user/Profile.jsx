import { useEffect, useState } from "react";
import { getUser } from "../../utils/auth";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    shortDescription: "",
    position: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const userId = getUser()._id;

  // Récupérer les infos de l'utilisateur actuel
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/admin/user/${userId}`);
        const data = await res.json();

        if (res.ok) setForm(data); // data = objet utilisateur
        else console.error(data.error || "Échec du chargement de l'utilisateur");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/admin/userEdit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...form }),
      });

      const data = await res.json();
      if (res.ok) setMessage("Profil mis à jour avec succès !");
      else setMessage(data.error || "Erreur lors de la mise à jour du profil");
    } catch (err) {
      console.error(err);
      setMessage("Erreur serveur");
    }
  };

  if (loading)
    return <p className="text-white text-center mt-20">Chargement du profil...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl w-full max-w-2xl flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold mb-4">Profil Utilisateur</h1>

        {form.profileImage && (
          <img
            src={form.profileImage}
            alt="Profil"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        )}

        <label>
          Nom
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
          />
        </label>

        <label>
          Courte description
          <input
            type="text"
            value={form.shortDescription}
            onChange={(e) =>
              setForm({ ...form, shortDescription: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
          />
        </label>

        <label>
          Poste / Fonction
          <input
            type="text"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
          />
        </label>

        <label>
          Email (non modifiable)
          <input
            type="text"
            value={form.email}
            disabled
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-gray-400 cursor-not-allowed"
          />
        </label>

        <button
          type="submit"
          className="bg-green-600 px-6 py-2 rounded hover:bg-green-700 mt-4"
        >
          Sauvegarder les modifications
        </button>

        {message && <p className="mt-2 text-green-400">{message}</p>}
      </form>
    </div>
  );
}