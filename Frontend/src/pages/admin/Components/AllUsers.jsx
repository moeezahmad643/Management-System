import { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";

export default function AllUsers({ limit }) {
  const [limit2, setLimit] = useState(limit);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  const [isOpen, setIsOpen] = useState(true); // dropdown open by default
  // const navigate = useNavigate();

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [limit2]);

  // Make admin
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
        alert(data.message || "Error promoting user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        fetchUsers();
      } else {
        alert(data.message || "Error deleting user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing
  const startEdit = (user) => {
    setEditUserId(user._id);
    setEditForm({ name: user.name, email: user.email });
  };

  // Save edit
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
        alert(data.message || "Error updating user");
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
        <h1 className="text-xl font-bold">All Users</h1>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="p-6">
          {loading ? (
            <p className="text-center">Loading users...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.splice(0, limit2).map((user) => (
                  <tr key={user._id} className="border-t border-gray-700">
                    <td className="p-3">
                      {editUserId === user._id ? (
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="px-2 py-1 rounded bg-gray-800 border border-gray-600"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="p-3">
                      {editUserId === user._id ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                          className="px-2 py-1 rounded bg-gray-800 border border-gray-600"
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3 flex gap-2 justify-center">
                      {editUserId === user._id ? (
                        <>
                          <button
                            onClick={() => saveEdit(user._id)}
                            className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                          >
                            Save
                          </button>
                          {user.role !== "admin" && (
                            <button
                              onClick={() => makeAdmin(user._id)}
                              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                            >
                              Make Admin
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => startEdit(user)}
                          className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                      )}

                      <button
                        onClick={() => deleteUser(user._id)}
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

          {users.length > limit2 && (
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
