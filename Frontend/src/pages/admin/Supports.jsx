import AllSupports from "./Components/AllSupports";

const Supports = () => {
  return (
    <div className="flex flex-wrap min-h-screen bg-gray-900 text-white p-6 pt-8">
      <AllSupports limit="all" width={"full"} moreButton={false} />
    </div>
  );
};

export default Supports;
