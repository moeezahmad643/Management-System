import AllGroups from "./Components/AllGroups";
import AllSupports from "./Components/AllSupports";
import AllTasks from "./Components/AllTasks";
import AllUsers from "./Components/AllUsers";

export default function Dashboard() {
  const limit = 5;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-8 max-[500px]:p-3">
      <div className="columns-1 md:columns-2 gap-6 [column-fill:_balance]">
        <div className="mb-6 break-inside-avoid">
          <AllUsers limit={limit} moreButton={true} />
        </div>
        <div className="mb-6 break-inside-avoid">
          <AllTasks limit={limit} moreButton={true} />
        </div>
        <div className="mb-6 break-inside-avoid">
          <AllGroups limit={limit} moreButton={true} />
        </div>
        <div className="mb-6 break-inside-avoid">
          <AllSupports limit={limit} moreButton={true} />
        </div>
      </div>
    </div>
  );
}
