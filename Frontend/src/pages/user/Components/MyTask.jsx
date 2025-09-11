import { useEffect, useState } from "react";
import { getUser } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

function MyTask({ defaultStatus = "pending" }) {
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
        setError(data.message || "Failed to fetch tasks");
        return;
      }

      // Filter tasks assigned to current user
      let myTasks = data.filter((task) =>
        task.assignedTo.some((assigned) => assigned._id === user?._id)
      );

      // Filter by status if not "all"
      if (filterStatus !== "all") {
        myTasks = myTasks.filter((task) => task.status === filterStatus);
      }

      setTasks(myTasks);
    } catch (err) {
      console.error(err);
      setError("Server error while fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchTasks();
  }, [user?._id, filterStatus]);

  // ✅ keep only ONE updateStatus
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
        window.location.reload();
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-white">Loading your tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const showIcons = window.innerWidth <= 1000;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md max-[500px]:p-2">
      <h2 className="text-2xl font-bold mb-4 text-white">📋 My Tasks</h2>

      {/* Status Filter */}
      <div className="mb-4 flex gap-3 flex-wrap items-center">
        {["all", "pending", "done", "failed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1 rounded ${
              filterStatus === status
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks found.</p>
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
                  <span className="font-medium">Degree:</span> {task.degree} |{" "}
                  <span className="font-medium">Status:</span>{" "}
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 flex-wrap">
                {/* See Task */}
                <button
                  onClick={() => navigate(`/portal/user/viewTask/${task._id}`)}
                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-1"
                >
                  {showIcons ? <FaEye /> : "See Task"}
                </button>

                {/* Only show Mark Done & Mark Failed if status is pending */}
                {task.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(task._id, "done")}
                      className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
                    >
                      {showIcons ? <FaCheck /> : "Mark Done"}
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(task._id, "failed")}
                      className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1"
                    >
                      {showIcons ? <FaTimes /> : "Mark Failed"}
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
