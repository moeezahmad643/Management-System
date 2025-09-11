const TaskInsights = ({ counters }) => {
  const { TotalTask, PendingTask, CompletedTask } = counters;

  const completedPercent = TotalTask ? Math.round((CompletedTask / TotalTask) * 100) : 0;
  const pendingPercent = TotalTask ? Math.round((PendingTask / TotalTask) * 100) : 0;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white">📊 Task Insights</h2>

      {/* Progress Bar */}
      <div className="w-full h-8 bg-gray-700 rounded-full overflow-hidden flex">
        <div
          className="bg-green-500 h-full transition-all duration-500"
          style={{ width: `${completedPercent}%` }}
        />
        <div
          className="bg-red-600 h-full transition-all duration-500"
          style={{ width: `${pendingPercent}%` }}
        />
      </div>

      {/* Summary */}
      <div className="mt-4 flex justify-between text-white">
        <p className="text-lg">
          Completed: <span className="font-bold">{completedPercent}%</span>
        </p>
        <p className="text-lg">
          Pending: <span className="font-bold">{pendingPercent}%</span>
        </p>
      </div>

      {/* Details */}
      <div className="mt-4 bg-gray-800 p-4 rounded-lg text-white flex justify-around">
        <div className="text-center">
          <p className="text-gray-400">Total Tasks</p>
          <p className="text-xl font-bold">{TotalTask}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Completed</p>
          <p className="text-xl font-bold">{CompletedTask}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Pending</p>
          <p className="text-xl font-bold">{PendingTask}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskInsights;
