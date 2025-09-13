import { useEffect, useState } from "react";
import { getUser } from "../../utils/auth";
import MyTask from "./Components/MyTask";
import TaskInsights from "./Components/TaskInsights";

export default function Dashboard() {
  const userId = getUser()?._id;

  const [user, setUser] = useState({});

  // 🔹 Fetch user profile + counters
  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/user/${userId}`);
      const data = await res.json();

      if (res.ok) {
        setUser(data);
      } else {
        console.error(data.error || "Failed to fetch user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) fetchUser();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white space-y-6 max-[500px]:p-2">
      <h1 className="text-3xl font-bold mb-6">Hi {user.name}</h1>


      {/* 🔹 Pass fetchUser so MyTask can refresh counters when status changes */}
      <MyTask onStatusChange={fetchUser} />
    </div>
  );
}