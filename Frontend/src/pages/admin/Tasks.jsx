import AllTasks from "./Components/AllTasks";

const Tasks = () => {
  return (
    <div className="flex flex-wrap min-h-screen bg-gray-900 text-white p-6 pt-8">
      <AllTasks limit="all" width={"full"} moreButton={false} />
    </div>
  );
};

export default Tasks;
