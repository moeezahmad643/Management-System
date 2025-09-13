// frontend/src/pages/Workgroups.jsx
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

  // état du filtre : "all" | "active" | "completed"
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Récupérer tous les groupes
        const groupsRes = await fetch(
          `http://localhost:5000/api/groups?limit=${limit}`
        );
        const allGroups = await groupsRes.json();

        // Filtrer les groupes où l'utilisateur est membre
        const userGroups = (allGroups || []).filter((group) =>
          Array.isArray(group.members)
            ? group.members.includes(userId)
            : false
        );

        setGroups(userGroups);
      } catch (err) {
        setError("Échec du chargement des groupes.");
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
        <p className="text-lg animate-pulse">Chargement de vos groupes...</p>
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

  // Normaliser les statuts et calculer les compteurs
  const normalized = groups.map((g) => ({
    ...g,
    __status: (g.status || "active").toString().toLowerCase(),
  }));

  const counts = {
    all: normalized.length,
    active: normalized.filter((g) => g.__status === "active").length,
    completed: normalized.filter((g) => g.__status === "termine").length,
  };

  // Appliquer le filtre pour afficher les bons groupes
  const visibleGroups =
    filter === "all"
      ? normalized
      : normalized.filter((g) => g.__status === filter);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Vos Groupes de Travail</h1>

      {/* Boutons de filtre */}
      <div className="max-w-4xl mx-auto mb-8 flex gap-3 justify-center">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl font-medium transition ${
            filter === "all"
              ? "bg-green-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Tous ({counts.all})
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-xl font-medium transition ${
            filter === "active"
              ? "bg-green-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Actifs ({counts.active})
        </button>
        <button
          onClick={() => setFilter("termine")}
          className={`px-4 py-2 rounded-xl font-medium transition ${
            filter === "termine"
              ? "bg-green-500 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Terminés ({counts.completed})
        </button>
      </div>

      {visibleGroups.length === 0 ? (
        <p className="text-center text-gray-400">
          Vous ne faites encore partie d'aucun groupe.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleGroups.map((group) => (
            <div
              key={group._id}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 hover:scale-105 transition-transform duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-semibold text-green-400 mb-2">
                  {group.title}
                </h2>
                <span
                  className={`text-sm px-2 py-1 rounded-full font-medium ${
                    (group.__status === "termine" && "bg-red-600 text-white") ||
                    (group.__status === "active" && "bg-green-600 text-white")
                  }`}
                >
                  {group.__status === "termine" ? "Terminé" : "Actif"}
                </span>
              </div>

              <p className="text-gray-300 mb-4">
                {group.description || "Aucune description fournie."}
              </p>

              <div className="flex justify-between text-sm text-gray-400">
                <span>👥 {Array.isArray(group.members) ? group.members.length : 0} Membres</span>
                <span>📅 {new Date(group.createdAt).toLocaleDateString("fr-FR")}</span>
              </div>

              <button
                onClick={() => navigate("/portal/user/viewgroup/" + group._id)}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl font-medium transition"
              >
                Ouvrir le Groupe
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}