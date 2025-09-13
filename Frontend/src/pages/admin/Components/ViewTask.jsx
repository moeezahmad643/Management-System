import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function ViewTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "en-attente",
    assignedTo: [],
    assignedGroup: null,
  });
  const [userInput, setUserInput] = useState("");

  const statusOptions = [
    "en-attente",
    "en-cours",
    "terminée",
    "en-pause",
    "validée",
    "problème",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = ["header", "bold", "italic", "underline", "strike", "list", "link"];

  // Récupérer les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users");
        const data = await res.json();
        if (res.ok && Array.isArray(data.users)) setUsers(data.users);
      } catch (err) {
        console.error("Échec de récupération des utilisateurs:", err);
      }
    };
    fetchUsers();
  }, []);

  // Récupérer les groupes
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/groups");
        const data = await res.json();
        if (res.ok && Array.isArray(data)) setGroups(data);
      } catch (err) {
        console.error("Échec de récupération des groupes:", err);
      }
    };
    fetchGroups();
  }, []);

  // Récupérer la tâche
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/tasks/${id}`);
        const data = await res.json();

        const assignedIds = Array.isArray(data.assignedTo)
          ? data.assignedTo.map((u) => (typeof u === "object" ? u._id : u))
          : [];

        setTask(data);
        setForm({
          title: data.title,
          description: data.description,
          status: data.status || "en-attente",
          assignedTo: assignedIds,
          assignedGroup:
            Array.isArray(data.assignedGroup) && data.assignedGroup.length > 0
              ? data.assignedGroup[0]._id
              : null,
        });
      } catch (err) {
        console.error("Erreur lors de la récupération de la tâche:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const saveEdit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setTask(data);
        setIsEditing(false);
      } else {
        alert(data.message || "Erreur lors de la mise à jour de la tâche");
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la tâche:", err);
    }
  };

  const addUser = (userId) => {
    if (!form.assignedTo.includes(userId)) {
      setForm({ ...form, assignedTo: [...form.assignedTo, userId] });
    }
    setUserInput("");
  };

  const removeUser = (userId) => {
    setForm({
      ...form,
      assignedTo: form.assignedTo.filter((id) => id !== userId),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl">Chargement de la tâche...</h1>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl">Tâche introuvable</h1>
      </div>
    );
  }

  const assignedNames =
    form.assignedTo?.length > 0
      ? form.assignedTo
          .map((id) => {
            const uid = typeof id === "object" ? id._id : id;
            const user = users.find((u) => u._id === uid);
            return user ? user.name : uid;
          })
          .join(", ")
      : "Aucun utilisateur assigné";

  const assignedGroupTitle = form.assignedGroup
    ? (() => {
        const gid =
          typeof form.assignedGroup === "object"
            ? form.assignedGroup._id
            : form.assignedGroup;
        return groups.find((g) => g._id === gid)?.title || gid;
      })()
    : "Aucun groupe assigné";

  return (
    <div className="flex items-center min-h-screen bg-gray-900 text-white p-10">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-4xl mx-auto">
        {isEditing ? (
          <>
            {/* Titre */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Titre</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
              />
            </div>

            {/* Description avec Quill */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Description</label>
              <div className="bg-gray-900 border border-gray-600 rounded text-white quill-dark">
                <ReactQuill
                  theme="snow"
                  value={form.description}
                  onChange={(value) => setForm({ ...form, description: value })}
                  modules={modules}
                  formats={formats}
                  placeholder="Modifier les détails de la tâche..."
                />
              </div>
            </div>

            {/* Statut */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Statut</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Assigner des utilisateurs */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Assigner des utilisateurs</label>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Tapez un nom ou email"
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
              />
              {userInput && (
                <div className="bg-gray-700 border border-gray-600 rounded mt-1 max-h-40 overflow-y-auto">
                  {users
                    .filter(
                      (u) =>
                        u.name.toLowerCase().includes(userInput.toLowerCase()) &&
                        !form.assignedTo.includes(u._id)
                    )
                    .map((u) => (
                      <div
                        key={u._id}
                        className="p-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => addUser(u._id)}
                      >
                        {u.name} ({u.email})
                      </div>
                    ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {form.assignedTo.map((id) => {
                  const user = users.find((u) => u._id === id);
                  return (
                    <div
                      key={id}
                      className="bg-green-600 px-3 py-1 rounded flex items-center gap-1"
                    >
                      <span>{user ? user.name : id}</span>
                      <button type="button" onClick={() => removeUser(id)}>
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Groupe assigné */}
            <div className="mb-6">
              <label className="block font-semibold mb-1">Groupe assigné</label>
              <select
                value={form.assignedGroup || ""}
                onChange={(e) => setForm({ ...form, assignedGroup: e.target.value })}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
              >
                <option value="">Aucun groupe assigné</option>
                {groups.map((g) => (
                  <option key={g._id} value={g._id}>
                    {g.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Boutons */}
            <div className="flex gap-4">
              <button
                onClick={saveEdit}
                className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
              >
                Enregistrer
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-700"
              >
                Annuler
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Mode Vue */}
            <p className="mb-4 p-4 bg-gray-900 rounded">
              <span className="font-bold text-lg">Titre :</span> {task.title}
            </p>
            <div className="mb-4 p-4 bg-gray-900 rounded">
              <span className="font-bold text-lg">Description :</span>
              <div
                className="prose prose-invert max-w-none mt-2 work-section"
                dangerouslySetInnerHTML={{ __html: task.description }}
              />
            </div>
            <p className="mb-4 p-4 bg-gray-900 rounded">
              <span className="font-bold text-lg">Statut :</span> {task.status}
            </p>
            <p className="mb-4 p-4 bg-gray-900 rounded">
              <span className="font-bold text-lg">Assignée à :</span> {assignedNames}
            </p>
            <p className="mb-6 p-4 bg-gray-900 rounded">
              <span className="font-bold text-lg">Groupe assigné :</span> {assignedGroupTitle || "Aucun"}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 px-6 py-2 rounded mr-4 hover:bg-yellow-600"
            >
              Modifier la tâche
            </button>

            <button
              onClick={navigate.bind(null, "/portal/admin/dashboard")}
              className="bg-blue-500 px-6 py-2 rounded mr-4 hover:bg-blue-600"
            >
              Retour
            </button>
          </>
        )}
      </div>
    </div>
  );
}