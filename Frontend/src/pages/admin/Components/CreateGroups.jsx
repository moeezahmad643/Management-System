import { useEffect, useState } from "react";

export default function CreateGroup() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    members: [],
  });
  const [users, setUsers] = useState([]); // all available users
  const [message, setMessage] = useState("");

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users");
        const data = await res.json();
        if (res.ok) setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Handle input change (title + description)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle member selection
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
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Group created successfully!");
        setFormData({ title: "", description: "", members: [] });
      } else {
        setMessage(data.message || "❌ Failed to create group");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error while creating group");
    }
  };

  return (
    <div className="mx-6 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Create New Group</h1>

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
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Group Title (e.g. Staff Members)"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-gray-900 border border-gray-600"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Group Purpose/Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full p-3 rounded bg-gray-900 border border-gray-600"
        />

        {/* Members */}
        <div>
          <label className="block mb-2 font-semibold">Select Members</label>
          <div className="max-h-40 overflow-y-auto border border-gray-700 rounded p-3 bg-gray-900">
            {users.length === 0 ? (
              <p className="text-gray-400">No users available</p>
            ) : (
              users.map((user) => (
                <div key={user._id} className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    checked={formData.members.includes(user._id)}
                    onChange={() => handleMemberToggle(user._id)}
                  />
                  <span>{user.username || user.email}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3 rounded"
        >
          Create Group
        </button>
      </form>
    </div>
  );
}