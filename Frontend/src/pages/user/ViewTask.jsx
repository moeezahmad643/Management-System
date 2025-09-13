// src/pages/user/ViewTask.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/tasks/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Échec du chargement de la tâche");
          return;
        }

        setTask(data);
      } catch (err) {
        console.error(err);
        setError("Erreur serveur lors du chargement de la tâche");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Chargement de la tâche...</p>
      </div>
    );

  if (error || !task)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-red-500">{error || "Tâche introuvable"}</p>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-4xl shadow-lg text-white">
        <h1 className="text-3xl font-bold text-indigo-400 mb-4">
          {task.title}
        </h1>

        <div className="mb-4 text-white">
          <h2 className="font-semibold text-white text-lg">Description :</h2>
          <div
            className="mt-2 text-gray-300 prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: task.description }}
          />
        </div>

        <p className="mb-2 text-white">
          <span className="font-semibold text-white">Statut :</span>{" "}
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </p>

        <p className="mb-2">
          <span className="font-semibold">Niveau :</span> {task.degree || "N/A"}
        </p>

        {task.assignedTo?.length > 0 && (
          <p className="mb-2">
            <span className="font-semibold">Assignée à :</span>{" "}
            Vous
          </p>
        )}

        {task.assignedGroup && (
          <p className="mb-4">
            <span className="font-semibold">Groupe assigné :</span>{" "}
            {typeof task.assignedGroup === "object"
              ? task.assignedGroup.title
              : task.assignedGroup}
          </p>
        )}

        <p className="text-sm text-gray-400">
          Créée le : {new Date(task.createdAt).toLocaleString("fr-FR")}
        </p>
        <p className="text-sm text-gray-400 mb-4">
          Dernière mise à jour : {new Date(task.updatedAt).toLocaleString("fr-FR")}
        </p>

        <button
          onClick={() => navigate("/portal/user/dashboard")}
          className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700"
        >
          Retour
        </button>
      </div>
    </div>
  );
}