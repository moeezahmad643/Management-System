import React from "react";
import AllUsers from "./Components/AllUsers";

const Users = () => {
  return (
    <div className="flex flex-wrap min-h-screen bg-gray-900 text-white p-6 pt-8">
      <AllUsers limit="all" width={"full"} moreButton={false} />
    </div>
  );
};

export default Users;
