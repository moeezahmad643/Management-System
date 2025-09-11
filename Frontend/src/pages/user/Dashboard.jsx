import { getUser } from "../../utils/auth";
import MyTask from "./Components/myTask";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white space-y-6">
      <h1 className="text-3xl font-bold mb-6">Hi {getUser().name}</h1>


      <MyTask/>
    </div>
  );
}
