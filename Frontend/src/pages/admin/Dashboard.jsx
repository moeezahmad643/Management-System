import AllGroups from "./Components/AllGroups";
import AllTasks from "./Components/AllTasks";
import AllUsers from "./Components/AllUsers";

export default function Dashboard() {
  const limit = 5;

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white space-y-6">
      <AllUsers limit={limit} />
      <AllTasks limit={limit} />
      <AllGroups limit={limit} />
    </div>
  );
}
