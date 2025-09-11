import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditGroup() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    members: [],
  });

  const [users, setUsers] = useState([]); // all available users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all users for member selection
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users");
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/groups/${id}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            title: data.title,
            description: data.description,
            members: data.members || [],
          });
        } else {
          setError(data.message || "Failed to fetch group");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching group");
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
    fetchUsers();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle member add/remove
  const handleMemberToggle = (userId) => {
    setFormData((prev) => {
      const isMember = prev.members.includes(userId);
      return {
        ...prev,
        members: isMember
          ? prev.members.filter((id) => id !== userId) // remove
          : [...prev.members, userId], // add
      };
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/groups/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Group updated successfully");
        navigate("/portal/admin/dashboard");
      } else {
        alert(data.message || "Error updating group");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <p className="text-center text-gray-400">Loading group...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex items-center min-h-screen bg-gray-900 text-white p-10">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Group</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2">Group Title</label>
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

          {/* Members */}
          <div>
            <label className="block mb-2">Members</label>
            <div className="max-h-40 overflow-y-auto border border-gray-700 rounded p-3 bg-gray-800">
              {users.map((user) => (
                <div key={user._id} className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    checked={formData.members.includes(user._id)}
                    onChange={() => handleMemberToggle(user._id)}
                  />
                  <span>{user.username || user.email}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 py-2 px-4 rounded hover:bg-indigo-700"
          >
            Update Group
          </button>
        </form>
      </div>
    </div>
  );
}
