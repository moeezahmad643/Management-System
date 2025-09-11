// src/pages/user/MyTask.jsx
import { useEffect, useState } from "react";
import { getUser } from "../../../utils/auth";

function MyTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = getUser(); // 👈 logged-in user from localStorage

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks");
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch tasks");
          return;
        }

        // ✅ filter tasks assigned to current user
        const myTasks = data.filter((task) =>
          task.assignedTo.some((assigned) => assigned._id === user?._id)
        );

        setTasks(myTasks);
      } catch (err) {
        setError("Server error while fetching tasks",err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchTasks();
    }
  }, [user?._id]);

  if (loading) return <p className="text-white">Loading your tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-white">📋 My Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks assigned to you yet.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-indigo-400">{task.title}</h3>
              <div
                className="text-gray-300 mt-2"
                dangerouslySetInnerHTML={{ __html: task.description }}
              />
              <p className="text-sm text-gray-400 mt-2">
                <span className="font-medium">Degree:</span> {task.degree} |{" "}
                <span className="font-medium">Status:</span> {task.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyTask;
