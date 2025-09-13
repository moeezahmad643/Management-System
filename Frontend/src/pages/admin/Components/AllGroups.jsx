import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // icons

export default function AllGroups({ limit, moreButton, width }) {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  // Fetch all groups
  const fetchGroups = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/groups?limit=${limit}`
      );
      const data = await res.json();
      setGroups(data);
    } catch (err) {
      console.error(err);
      setError("Échec du chargement des groupes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // Delete group
  const deleteGroup = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce groupe ?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/groups/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        fetchGroups();
      } else {
        alert(data.message || "Erreur lors de la suppression du groupe");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      className={
        width === "half" ? "w-1/2 pb-6 px-2 lg:w-full" : "w-full pb-6 px-2"
      }
    >
      <div className="w-full rounded-lg overflow-hidden bg-gray-900 text-white border border-gray-700">
        {/* Dropdown Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center px-6 py-4 bg-gray-800 hover:bg-gray-700"
        >
          <h1 className="text-xl font-bold max-[500px]:text-lg">
            Tous les groupes
          </h1>
          <span className="max-[500px]:text-sm">{isOpen ? "▲" : "▼"}</span>
        </button>

        {isOpen && (
          <div className="p-6 max-[500px]:p-3">
            {loading ? (
              <p className="text-center max-[500px]:text-sm">
                Chargement des groupes...
              </p>
            ) : error ? (
              <p className="text-center text-red-500 max-[500px]:text-sm">
                {error}
              </p>
            ) : groups.length === 0 ? (
              <p className="text-center text-gray-400 max-[500px]:text-sm">
                Aucun groupe trouvé.
              </p>
            ) : (
              <table className="w-full border border-gray-700 rounded-lg overflow-hidden text-base max-[500px]:text-sm">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-3 text-left">Titre</th>
                    <th className="p-3 text-center">Membres</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((group) => {
                    const showIcons = window.innerWidth <= 1000;
                    return (
                      <tr
                        key={group._id}
                        className="border-t border-gray-700"
                      >
                        <td className="p-3 cursor-pointer">{group.title}</td>
                        <td className="p-3 text-center">
                          {group.members?.length || 0}
                        </td>
                        <td className="p-3 flex gap-2 justify-center">
                          <button
                            onClick={() =>
                              navigate(`/portal/admin/editgroup/${group._id}`)
                            }
                            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 flex items-center justify-center max-[500px]:px-2 max-[500px]:py-1"
                          >
                            {showIcons ? <FaEdit /> : "Voir/Modifier"}
                          </button>
                          <button
                            onClick={() => deleteGroup(group._id)}
                            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 flex items-center justify-center max-[500px]:px-2 max-[500px]:py-1"
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
                moreButton
                  ? "flex justify-center mt-6"
                  : "flex justify-center mt-6 hidden"
              }
            >
              <button
                onClick={() => navigate(`/portal/admin/group`)}
                className="w-screen bg-indigo-600 px-6 py-2 rounded font-semibold hover:bg-indigo-700 max-[500px]:px-3 max-[500px]:py-1 max-[500px]:text-sm"
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