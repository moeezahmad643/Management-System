import React, { useEffect, useState } from "react";
import { getUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Workgroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 50;
  const navigate = useNavigate();

  const userId = getUser()?._id;

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Fetch all groups
        const groupsRes = await fetch(
          `http://localhost:5000/api/groups?limit=${limit}`
        );
        const allGroups = await groupsRes.json();

        // Filter groups where userId exists in members
        const userGroups = allGroups.filter((group) =>
          group.members.includes(userId)
        );

        setGroups(userGroups);
      } catch (err) {
        setError("Failed to load groups.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg animate-pulse">Loading your groups...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Your Workgroups</h1>

      {groups.length === 0 ? (
        <p className="text-center text-gray-400">
          You are not part of any groups yet.
        </p>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group._id}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 hover:scale-105 transition-transform duration-200"
            >
              <h2 className="text-2xl font-semibold text-green-400 mb-2">
                {group.title}
              </h2>
              <p className="text-gray-300 mb-4">
                {group.description || "No description provided."}
              </p>

              <div className="flex justify-between text-sm text-gray-400">
                <span>👥 {group.members.length} Members</span>
                <span>📅 {new Date(group.createdAt).toLocaleDateString()}</span>
              </div>

              <button
                onClick={() => navigate("/portal/user/viewgroup/" + group._id)}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl font-medium transition"
              >
                Open Group
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
