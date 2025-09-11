import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllTasks({ limit }) {
  const [limit2, setLimit] = useState(limit);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete task
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        fetchTasks();
      } else {
        alert(data.message || "Error deleting task");
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
        <h1 className="text-xl font-bold">All Tasks</h1>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="p-6">
          {loading ? (
            <p className="text-center">Loading tasks...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Created </th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.splice(0, limit2).map((task) => (
                  <tr key={task._id} className="border-t border-gray-700">
                    <td className="p-3">{task.title}</td>
                    <td className="p-3">{task.status}</td>
                    <td className="p-3">{task.createdAt}</td>
                    <td className="p-3 flex gap-2 justify-center">
                      <button
                        onClick={() => navigate(`/admin/tasks/${task._id}`)}
                        className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                      >
                        View/Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task._id)}
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

          {tasks.length > limit2 && (
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
