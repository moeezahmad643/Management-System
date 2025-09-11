import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // icons

export default function AllTasks({ limit, moreButton, width }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/tasks?limit=${limit}`);
      const data = await res.json();

      if (res.ok) {
        setTasks(data); // backend returns array
      } else {
        setError(data.message || "Failed to fetch tasks");
      }
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
    <section
      className={
        width === "half" ? "w-1/2 pb-6 px-2 lg:w-full" : "w-full pb-6 px-2"
      }
    >
      <div className="w-full rounded-lg overflow-hidden bg-gray-900 text-white border border-gray-700">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center px-6 py-4 bg-gray-800 hover:bg-gray-700"
        >
          <h1 className="text-xl font-bold max-[500px]:text-lg">All Tasks</h1>
          <span className="max-[500px]:text-sm">{isOpen ? "▲" : "▼"}</span>
        </button>

        {isOpen && (
          <div className="p-6 max-[500px]:p-3">
            {loading ? (
              <p className="text-center max-[500px]:text-sm">
                Loading tasks...
              </p>
            ) : error ? (
              <p className="text-center text-red-500 max-[500px]:text-sm">
                {error}
              </p>
            ) : (
              <table className="w-full border border-gray-700 rounded-lg overflow-hidden text-base max-[500px]:text-sm">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => {
                    const showIcons = window.innerWidth <= 1000;
                    return (
                      <tr key={task._id} className="border-t border-gray-700">
                        <td className="p-3">{task.title}</td>
                        <td className="p-3">{task.status}</td>

                        <td className="p-3 flex gap-2 justify-center">
                          <button
                            onClick={() =>
                              navigate(`/portal/admin/tasks/${task._id}`)
                            }
                            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 flex items-center justify-center max-[500px]:px-2 max-[500px]:py-1"
                          >
                            {showIcons ? <FaEdit /> : "View/Edit"}
                          </button>
                          <button
                            onClick={() => deleteTask(task._id)}
                            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 flex items-center justify-center max-[500px]:px-2 max-[500px]:py-1"
                          >
                            {showIcons ? <FaTrash /> : "Delete"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {/* "Load More" → redirect to full tasks page */}
            <div
              className={
                moreButton
                  ? "flex justify-center mt-6"
                  : "flex justify-center mt-6 hidden"
              }
            >
              <button
                onClick={() => navigate(`/portal/admin/tasks`)}
                className="w-screen bg-indigo-600 px-6 py-2 rounded font-semibold hover:bg-indigo-700 max-[500px]:px-3 max-[500px]:py-1 max-[500px]:text-sm"
              >
                Load More
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
