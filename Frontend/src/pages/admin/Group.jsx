import AllGroups from "./Components/AllGroups";

const Tasks = () => {
  return (
    <div className="flex flex-wrap min-h-screen bg-gray-900 text-white p-6 pt-8">
      <AllGroups limit="all" width={"full"} moreButton={false} />
    </div>
  );
};

export default Tasks;
