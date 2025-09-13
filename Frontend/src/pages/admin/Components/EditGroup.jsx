// frontend/src/pages/EditGroup.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ModifierGroupe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    members: [],
    twoWay: false, // contrôle qui peut envoyer des messages
    status: "actif", // actif | terminé
    conclusion: "", // détails quand terminé
  });

  const [users, setUsers] = useState([]); // tous les utilisateurs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Charger tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users");
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
      } else {
        console.warn("Échec du chargement des utilisateurs", data);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs:", err);
    }
  };

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/groups/${id}`);
        const data = await res.json();
        if (res.ok) {
          setFormData((prev) => ({
            ...prev,
            title: data.title || "",
            description: data.description || "",
            members: data.members || [],
            twoWay: typeof data.twoWay !== "undefined" ? data.twoWay : prev.twoWay,
            status: data.status || prev.status,
            conclusion: data.conclusion || "",
          }));
        } else {
          setError(data.message || "Échec du chargement du groupe");
        }
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement du groupe");
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "twoWay") {
      setFormData((prev) => ({ ...prev, twoWay: value === "true" }));
      return;
    }
    if (name === "status") {
      setFormData((prev) => ({ ...prev, status: value }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberToggle = (userId) => {
    setFormData((prev) => {
      const isMember = prev.members.includes(userId);
      return {
        ...prev,
        members: isMember ? prev.members.filter((id) => id !== userId) : [...prev.members, userId],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.status === "termine" && (!formData.conclusion || !formData.conclusion.trim())) {
      alert("Veuillez fournir une conclusion lorsque vous marquez le groupe comme terminé.");
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      members: formData.members,
      twoWay: !!formData.twoWay,
      status: formData.status,
      conclusion: formData.conclusion || "",
    };

    try {
      const res = await fetch(`http://localhost:5000/api/groups/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Groupe mis à jour avec succès");
        navigate("/portal/admin/dashboard");
      } else {
        alert(data.message || "❌ Erreur lors de la mise à jour du groupe");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de la mise à jour du groupe");
    }
  };

  if (loading) return <p className="text-center text-gray-400">Chargement du groupe...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex items-center min-h-screen bg-gray-900 text-white p-10">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Modifier le groupe</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titre */}
          <div>
            <label className="block mb-2">Titre du groupe</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
            />
          </div>

          {/* Politique de messages */}
          <div>
            <label className="block mb-2">Qui peut envoyer des messages ?</label>
            <select
              name="twoWay"
              value={String(formData.twoWay)}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-600"
            >
              <option value="false">Seulement les administrateurs</option>
              <option value="true">Tous les membres</option>
            </select>
          </div>

          {/* Statut */}
          <div>
            <label className="block mb-2">Statut du groupe</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-600"
            >
              <option value="actif">Actif</option>
              <option value="termine">Terminé</option>
            </select>
          </div>

          {/* Conclusion (si terminé) */}
          {formData.status === "termine" && (
            <div>
              <label className="block mb-2">Conclusion (obligatoire si terminé)</label>
              <textarea
                name="conclusion"
                value={formData.conclusion}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="Écrivez les notes finales, décisions et conclusions concernant ce groupe..."
                required={formData.status === "termine"}
              />
            </div>
          )}

          {/* Membres */}
          <div>
            <label className="block mb-2">Membres</label>
            <div className="max-h-40 overflow-y-auto border border-gray-700 rounded p-3 bg-gray-800">
              {users.map((user) => (
                <div key={user._id} className="flex items-center gap-2 py-1">
                  <input type="checkbox" checked={formData.members.includes(user._id)} onChange={() => handleMemberToggle(user._id)} />
                  <span>{user.username || user.email}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Soumettre */}
          <button type="submit" className="w-full bg-indigo-600 py-2 px-4 rounded hover:bg-indigo-700">
            Mettre à jour le groupe
          </button>
        </form>
      </div>
    </div>
  );
}