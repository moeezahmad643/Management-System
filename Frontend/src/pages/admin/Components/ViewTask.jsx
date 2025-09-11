import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function ViewTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    assignedTo: [],
    assignedGroup: null,
  });
  const [userInput, setUserInput] = useState("");

  const statusOptions = [
    "pending",
    "in-progress",
    "done",
    "on-hold",
    "passed",
    "problem",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "link",
  ];

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users");
        const data = await res.json();
        if (res.ok && Array.isArray(data)) setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Fetch all groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/groups");
        const data = await res.json();
        console.log(data);

        if (res.ok && Array.isArray(data)) setGroups(data);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      }
    };
    fetchGroups();
  }, []);

  // Fetch task
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/tasks/${id}`);
        const data = await res.json();

        const assignedIds = Array.isArray(data.assignedTo)
          ? data.assignedTo.map((u) => (typeof u === "object" ? u._id : u))
          : [];

        setTask(data);
        setForm({
          title: data.title,
          description: data.description,
          status: data.status || "pending",
          assignedTo: assignedIds,
          assignedGroup:
            Array.isArray(data.assignedGroup) && data.assignedGroup.length > 0
              ? data.assignedGroup[0]._id
              : null,
        });
      } catch (err) {
        console.error("Error fetching task:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const saveEdit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setTask(data);
        setIsEditing(false);
      } else {
        alert(data.message || "Error updating task");
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const addUser = (userId) => {
    if (!form.assignedTo.includes(userId)) {
      setForm({ ...form, assignedTo: [...form.assignedTo, userId] });
    }
    setUserInput("");
  };

  const removeUser = (userId) => {
    setForm({
      ...form,
      assignedTo: form.assignedTo.filter((id) => id !== userId),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl">Loading task...</h1>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl">Task not found</h1>
      </div>
    );
  }

  const assignedNames =
    form.assignedTo?.length > 0
      ? form.assignedTo
          .map((id) => {
            const uid = typeof id === "object" ? id._id : id;
            const user = users.find((u) => u._id === uid);
            return user ? user.name : uid;
          })
          .join(", ")
      : "No users assigned";

  const assignedGroupTitle = form.assignedGroup
    ? (() => {
        const gid =
          typeof form.assignedGroup === "object"
            ? form.assignedGroup._id
            : form.assignedGroup;
        return groups.find((g) => g._id === gid)?.title || gid;
      })()
    : "No group assigned";

  return (
    <div className="flex items-center min-h-screen bg-gray-900 text-white p-10">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-4xl mx-auto">
        {isEditing ? (
          <>
            {/* Title */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
              />
            </div>

            {/* Description with Quill */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Description</label>
              <div className="bg-gray-900 border border-gray-600 rounded text-white quill-dark">
                <ReactQuill
                  theme="snow"
                  value={form.description}
                  onChange={(value) => setForm({ ...form, description: value })}
                  modules={modules}
                  formats={formats}
                  placeholder="Edit task details..."
                />
              </div>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Assign Users */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Assign Users</label>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type user name or email"
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
              />
              {userInput && (
                <div className="bg-gray-700 border border-gray-600 rounded mt-1 max-h-40 overflow-y-auto">
                  {users
                    .filter(
                      (u) =>
                        u.name
                          .toLowerCase()
                          .includes(userInput.toLowerCase()) &&
                        !form.assignedTo.includes(u._id)
                    )
                    .map((u) => (
                      <div
                        key={u._id}
                        className="p-2 hover:bg-gray-600 cursor-pointer"
                        onClick={() => addUser(u._id)}
                      >
                        {u.name} ({u.email})
                      </div>
                    ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {form.assignedTo.map((id) => {
                  const user = users.find((u) => u._id === id);
                  return (
                    <div
                      key={id}
                      className="bg-green-600 px-3 py-1 rounded flex items-center gap-1"
                    >
                      <span>{user ? user.name : id}</span>
                      <button type="button" onClick={() => removeUser(id)}>
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Assigned Group */}
            <div className="mb-6">
              <label className="block font-semibold mb-1">Assigned Group</label>
              <select
                value={form.assignedGroup || ""}
                onChange={(e) =>
                  setForm({ ...form, assignedGroup: e.target.value })
                }
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
              >
                <option value="">No group assigned</option>
                {groups.map((g) => (
                  <option key={g._id} value={g._id}>
                    {g.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={saveEdit}
                className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {/* View Mode */}
            <p className="mb-4 p-4 bg-gray-900 rounded">
              <span className="font-bold text-lg">Title:</span> {task.title}
            </p>
            <div className="mb-4 p-4 bg-gray-900 rounded">
              <span className="font-bold text-lg">Description:</span>
              <div
                className="prose prose-invert max-w-none mt-2 work-section"
                dangerouslySetInnerHTML={{ __html: task.description }}
              />
            </div>
            <p className="mb-4 p-4 bg-gray-900 rounded">
              <span className="font-bold text-lg">Status:</span> {task.status}
            </p>
            <p className="mb-4 p-4 bg-gray-900 rounded">
              <span className="font-bold text-lg">Assigned To:</span>{" "}
              {assignedNames}
            </p>
            <p className="mb-6 p-4 bg-gray-900 rounded">
              <span className="font-bold text-lg">Assigned Group:</span>{" "}
              {assignedGroupTitle || "No group assigned"}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 px-6 py-2 rounded mr-4 hover:bg-yellow-600"
            >
              Edit Task
            </button>

            <button
              onClick={navigate.bind(null, "/admin/dashboard")}
              className="bg-blue-500 px-6 py-2 rounded mr-4 hover:bg-blue-600"
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
