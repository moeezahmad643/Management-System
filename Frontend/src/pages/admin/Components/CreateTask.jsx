import { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function CreerTache() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "en_attente",
    degree: "moyenne",
    assignedTo: [],
    assignedGroup: [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedRoles, setExpandedRoles] = useState({});

  // 🔹 Récupérer utilisateurs & groupes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, groupRes] = await Promise.all([
          fetch("http://localhost:5000/api/admin/users"),
          fetch("http://localhost:5000/api/groups"),
        ]);

        const userData = await userRes.json();
        const groupData = await groupRes.json();

        setUsers(userData.users || []);
        setGroups(groupData || []);
      } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs/groupes:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const toggleUser = (userId) => {
    setFormData((prev) => {
      const exists = prev.assignedTo.includes(userId);
      return {
        ...prev,
        assignedTo: exists
          ? prev.assignedTo.filter((id) => id !== userId)
          : [...prev.assignedTo, userId],
      };
    });
  };

  const toggleGroup = (groupId) => {
    setFormData((prev) => {
      const exists = prev.assignedGroup.includes(groupId);
      return {
        ...prev,
        assignedGroup: exists
          ? prev.assignedGroup.filter((id) => id !== groupId)
          : [...prev.assignedGroup, groupId],
      };
    });
  };

  const toggleRole = (role, roleUsers) => {
    setFormData((prev) => {
      const allSelected = roleUsers.every((u) =>
        prev.assignedTo.includes(u._id)
      );
      return {
        ...prev,
        assignedTo: allSelected
          ? prev.assignedTo.filter((id) => !roleUsers.some((u) => u._id === id))
          : [...new Set([...prev.assignedTo, ...roleUsers.map((u) => u._id)])],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Tâche créée avec succès !");
        setFormData({
          title: "",
          description: "",
          status: "en_attente",
          degree: "moyenne",
          assignedTo: [],
          assignedGroup: [],
        });
      } else {
        setMessage(data.message || "❌ Échec de la création de la tâche");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Erreur serveur lors de la création de la tâche");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Barre d’outils Quill
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };
  const formats = ["header", "bold", "italic", "underline", "list", "link"];

  // 🔹 Grouper utilisateurs par rôle
  const groupedUsers = Array.isArray(users)
    ? users.reduce((acc, user) => {
        const role = user.role || "Autres";
        if (!acc[role]) acc[role] = [];
        acc[role].push(user);
        return acc;
      }, {})
    : {};

  // 🔹 Filtre recherche
  const filteredGroupedUsers = Object.fromEntries(
    Object.entries(groupedUsers).map(([role, roleUsers]) => [
      role,
      roleUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      ),
    ])
  );

  return (
    <div className="mx-6 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Créer une nouvelle tâche</h1>

      {message && (
        <p
          className={`mb-4 ${
            message.includes("✅") ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Titre */}
        <input
          type="text"
          name="title"
          placeholder="Titre de la tâche"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-900 border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
        />

        {/* Description */}
        <div className="bg-gray-900 border border-gray-600 rounded quill-dark">
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleQuillChange}
            modules={modules}
            formats={formats}
            placeholder="Écrivez les détails de la tâche ici..."
          />
        </div>

        {/* Statut */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-900 border border-gray-600"
        >
          <option value="en_attente">⏳ En attente</option>
          <option value="terminee">✅ Terminée</option>
          <option value="echouee">❌ Échouée</option>
        </select>

        {/* Degré */}
        <select
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-900 border border-gray-600"
        >
          <option value="faible">🟢 Faible</option>
          <option value="moyenne">🟡 Moyenne</option>
          <option value="elevee">🔴 Élevée</option>
        </select>

        {/* Assigner aux utilisateurs */}
        <div className="bg-gray-900 p-4 rounded border border-gray-600">
          <label className="block font-semibold mb-2">
            Assigner aux utilisateurs
          </label>
          <input
            type="text"
            placeholder="Rechercher des utilisateurs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />

          {Object.entries(filteredGroupedUsers).map(([role, roleUsers]) => (
            <div key={role} className="mb-4">
              <button
                type="button"
                onClick={() =>
                  setExpandedRoles((prev) => ({
                    ...prev,
                    [role]: !prev[role],
                  }))
                }
                className="w-full flex justify-between items-center px-3 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                <span className="font-bold">{role}</span>
                <span>{expandedRoles[role] ? "▲" : "▼"}</span>
              </button>
              {expandedRoles[role] && (
                <div className="mt-2 pl-4">
                  <button
                    type="button"
                    onClick={() => toggleRole(role, roleUsers)}
                    className="text-sm text-indigo-400 hover:underline mb-2"
                  >
                    Tout sélectionner / Tout désélectionner
                  </button>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {roleUsers.map((user) => (
                      <label key={user._id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.assignedTo.includes(user._id)}
                          onChange={() => toggleUser(user._id)}
                        />
                        <span>
                          {user.name} ({user.email})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Assigner aux groupes */}
        <div className="bg-gray-900 p-4 rounded border border-gray-600">
          <label className="block font-semibold mb-2">Assigner aux groupes</label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {groups.map((group) => (
              <label key={group._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.assignedGroup.includes(group._id)}
                  onChange={() => toggleGroup(group._id)}
                />
                <span>{group.title}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3 rounded transition"
        >
          {loading ? "Création en cours..." : "Créer la tâche"}
        </button>
      </form>
    </div>
  );
}