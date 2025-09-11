import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllGroups({ limit }) {
  const [limit2, setLimit] = useState(limit);

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  // Fetch all groups
  const fetchGroups = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/groups");
      const data = await res.json();
      setGroups(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch groups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // Delete group
  const deleteGroup = async (id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/groups/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        fetchGroups();
      } else {
        alert(data.message || "Error deleting group");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-6 my-4 rounded-lg overflow-hidden bg-gray-900 text-white border border-gray-700">
      {/* Dropdown Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-6 py-4 bg-gray-800 hover:bg-gray-700"
      >
        <h1 className="text-xl font-bold">All Groups</h1>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="p-6">
          {loading ? (
            <p className="text-center">Loading groups...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : groups.length === 0 ? (
            <p className="text-center text-gray-400">No groups found.</p>
          ) : (
            <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-center">Members</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {groups.splice(0, limit).map((group) => (
                  <tr key={group._id} className="border-t border-gray-700">
                    <td className="p-3">{group.title}</td>
                    <td className="p-3 text-gray-300">
                      {group.description || "-"}
                    </td>
                    <td className="p-3 text-center">
                      {group.members?.length || 0}
                    </td>
                    <td className="p-3 flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          navigate(`/admin/editgroup/${group._id}`)
                        }
                        className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                      >
                        View/Edit
                      </button>
                      <button
                        onClick={() => deleteGroup(group._id)}
                        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {groups.length > limit2 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setLimit(limit2 + 10)}
                className="w-screen bg-indigo-600 px-6 py-2 rounded font-semibold hover:bg-indigo-700"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
