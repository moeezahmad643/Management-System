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

  // Fetch current user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/admin/user/${userId}`);
        const data = await res.json();

        if (res.ok) setForm(data); // data is the user object
        else console.error(data.error || "Failed to fetch user");
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
      if (res.ok) setMessage("Profile updated successfully!");
      else setMessage(data.error || "Error updating profile");
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  if (loading)
    return <p className="text-white text-center mt-20">Loading profile...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl w-full max-w-2xl flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>

        {form.profileImage && (
          <img
            src={form.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        )}

        <label>
          Name
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
          />
        </label>

        <label>
          Short Description
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
          Position / Post
          <input
            type="text"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
          />
        </label>

        <label>
          Email (cannot change)
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
          Save Changes
        </button>

        {message && <p className="mt-2 text-green-400">{message}</p>}
      </form>
    </div>
  );
}