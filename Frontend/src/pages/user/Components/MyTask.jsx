import { useEffect, useState } from "react";
import { getUser } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

function MyTask({ defaultStatus = "en_attente" }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState(defaultStatus);

  const user = getUser();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Échec du chargement des tâches");
        return;
      }

      // 🔹 Filtrer les tâches assignées à l’utilisateur
      let myTasks = data.filter((task) =>
        task.assignedTo.some((assigned) => assigned._id === user?._id)
      );

      // 🔹 Filtrer par statut si ≠ "toutes"
      if (filterStatus !== "toutes") {
        myTasks = myTasks.filter((task) => task.status === filterStatus);
      }

      setTasks(myTasks);
    } catch (err) {
      console.error(err);
      setError("Erreur serveur lors du chargement des tâches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchTasks();
  }, [user?._id, filterStatus]);

  // ✅ mise à jour du statut
  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok) {
        fetchTasks();
      } else {
        alert(data.message || "Impossible de mettre à jour le statut");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-white">Chargement de vos tâches...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const showIcons = window.innerWidth <= 1000;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md max-[500px]:p-2">
      <h2 className="text-2xl font-bold mb-4 text-white">📋 Mes Tâches</h2>

      {/* 🔹 Filtre de statut */}
      <div className="mb-4 flex gap-3 flex-wrap items-center">
        {["toutes", "en_attente", "terminee", "echouee"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1 rounded ${
              filterStatus === status
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {status === "toutes" && "Toutes"}
            {status === "en_attente" && "En attente"}
            {status === "terminee" && "Terminées"}
            {status === "echouee" && "Échouées"}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-400">Aucune tâche trouvée.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
            >
              <div>
                <h3 className="text-lg font-semibold text-indigo-400">
                  {task.title}
                </h3>
                <div
                  className="text-gray-300 mt-2"
                  dangerouslySetInnerHTML={{ __html: task.description }}
                />
                <p className="text-sm text-gray-400 mt-2">
                  <span className="font-medium">Degré :</span> {task.degree} |{" "}
                  <span className="font-medium">Statut :</span>{" "}
                  {task.status === "en_attente" && "En attente"}
                  {task.status === "terminee" && "Terminée"}
                  {task.status === "echouee" && "Échouée"}
                </p>
              </div>

              {/* 🔹 Boutons d’action */}
              <div className="flex gap-2 flex-wrap">
                {/* Voir la tâche */}
                <button
                  onClick={() => navigate(`/portal/user/viewTask/${task._id}`)}
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-1"
                >
                  {showIcons ? <FaEye /> : "Voir"}
                </button>

                {/* Montrer "Terminer / Échouer" seulement si en attente */}
                {task.status === "en_attente" && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(task._id, "terminee")}
                      className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
                    >
                      {showIcons ? <FaCheck /> : "Marquer Terminée"}
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(task._id, "echouee")}
                      className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1"
                    >
                      {showIcons ? <FaTimes /> : "Marquer Échouée"}
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyTask;