import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPersonBooth, FaSave } from "react-icons/fa"; // icons
import { HiMiniXMark } from "react-icons/hi2";

export default function AllUsers(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editUserId, setEditUserId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "" });

  const [isOpen, setIsOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 500);

  const navigate = useNavigate();

  // Screen resize listener
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/admin/users?limit=${props.limit}`
      );
      const data = await res.json();

      if (res.ok) {
        setUsers(data.users);
      } else {
        setError(data.message || "Échec du chargement des utilisateurs");
      }
    } catch (err) {
      console.error(err);
      setError("Échec du chargement des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- ACTIONS ---
  const makeAdmin = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${id}/make-admin`,
        { method: "PATCH" }
      );
      const data = await res.json();
      if (res.ok) {
        fetchUsers();
      } else {
        alert(data.message || "Erreur lors de la promotion de l’utilisateur");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?"))
      return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        fetchUsers();
      } else {
        alert(data.message || "Erreur lors de la suppression de l’utilisateur");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (user) => {
    setEditUserId(user._id);
    setEditForm({ name: user.name });
  };

  const saveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (res.ok) {
        setEditUserId(null);
        fetchUsers();
      } else {
        alert(data.message || "Erreur lors de la mise à jour de l’utilisateur");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- UI ---
  return (
    <section
      className={
        props.width == "half" ? "w-1/2 pb-6 px-2 lg:w-full" : "w-full pb-6 px-2"
      }
    >
      <div className="w-full rounded-lg overflow-hidden bg-gray-900 text-white border border-gray-700">
        {/* Dropdown Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center px-6 py-4 bg-gray-800 hover:bg-gray-700"
        >
          <h1 className="text-xl font-bold">Tous les utilisateurs</h1>
          <span>{isOpen ? "▲" : "▼"}</span>
        </button>

        {isOpen && (
          <div className="p-6">
            {loading ? (
              <p className="text-center">Chargement des utilisateurs...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
                <thead className="bg-gray-800">
                  <tr>
                    <th
                      className={`p-3 text-left ${
                        isSmallScreen ? "text-xs" : "text-sm"
                      }`}
                    >
                      Nom
                    </th>
                    <th
                      className={`p-3 text-left ${
                        isSmallScreen ? "text-xs" : "text-sm"
                      }`}
                    >
                      Rôle
                    </th>
                    <th
                      className={`p-3 text-center ${
                        isSmallScreen ? "text-xs" : "text-sm"
                      }`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const showIcons = window.innerWidth <= 1000;

                    return (
                      <tr key={user._id} className="border-t border-gray-700">
                        <td
                          className={`p-3 ${
                            isSmallScreen ? "text-xs" : "text-sm"
                          }`}
                        >
                          {editUserId === user._id ? (
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  name: e.target.value,
                                })
                              }
                              className={`px-2 py-1 rounded bg-gray-800 border border-gray-600 ${
                                isSmallScreen ? "text-xs" : "text-sm"
                              }`}
                            />
                          ) : (
                            user.name
                          )}
                        </td>
                        <td
                          className={`p-3 ${
                            isSmallScreen ? "text-xs" : "text-sm"
                          }`}
                        >
                          {user.role}
                        </td>
                        <td
                          className={`p-3 flex gap-2 justify-center ${
                            isSmallScreen ? "text-xs" : "text-sm"
                          }`}
                        >
                          {editUserId === user._id ? (
                            <>
                              <button
                                onClick={() => saveEdit(user._id)}
                                className={`bg-green-600 px-3 py-1 rounded hover:bg-green-700 ${
                                  isSmallScreen ? "text-xs" : "text-sm"
                                }`}
                              >
                                {showIcons ? <FaSave /> : "Enregistrer"}
                              </button>
                              <button
                                onClick={() => setEditUserId(null)}
                                className={`bg-gray-600 px-3 py-1 rounded hover:bg-gray-700 ${
                                  isSmallScreen ? "text-xs" : "text-sm"
                                }`}
                              >
                                {showIcons ? <HiMiniXMark /> : "Annuler"}
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => startEdit(user)}
                              className={`bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 ${
                                isSmallScreen ? "text-xs" : "text-sm"
                              }`}
                            >
                              {showIcons ? <FaEdit /> : "Modifier"}
                            </button>
                          )}

                          {user.role !== "admin" ? (
                            <button
                              onClick={() => makeAdmin(user._id)}
                              className={`bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 ${
                                isSmallScreen ? "text-xs" : "text-sm"
                              }`}
                            >
                              {showIcons ? <FaPersonBooth /> : "Nommer Admin"}
                            </button>
                          ) : (
                            <button
                              className={`bg-blue-700 px-3 py-1 rounded opacity-50 cursor-not-allowed ${
                                isSmallScreen ? "text-xs" : "text-sm"
                              }`}
                              disabled
                            >
                              {showIcons ? <FaPersonBooth /> : "Déjà Admin"}
                            </button>
                          )}

                          <button
                            onClick={() => deleteUser(user._id)}
                            className={`bg-red-600 px-3 py-1 rounded hover:bg-red-700 ${
                              isSmallScreen ? "text-xs" : "text-sm"
                            }`}
                          >
                            {showIcons ? <FaTrash /> : "Supprimer"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            <div
              className={
                props.moreButton
                  ? "flex justify-center mt-6"
                  : "flex justify-center mt-6 hidden"
              }
            >
              <button
                onClick={() => navigate(`/portal/admin/users`)}
                className={`w-screen bg-indigo-600 px-6 py-2 rounded font-semibold hover:bg-indigo-700 ${
                  isSmallScreen ? "text-xs" : "text-sm"
                }`}
              >
                Charger plus
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}