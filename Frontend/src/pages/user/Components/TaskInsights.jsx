const TaskInsights = ({ counters }) => {
  // Default to 0 if backend didn't send FailedTask
  const {
    TotalTask = 0,
    PendingTask = 0,
    CompletedTask = 0,
    FailedTask = 0,
  } = counters || {};

  const completedPercent = TotalTask ? Math.round((CompletedTask / TotalTask) * 100) : 0;
  const pendingPercent = TotalTask ? Math.round((PendingTask / TotalTask) * 100) : 0;
  const failedPercent = TotalTask ? Math.round((FailedTask / TotalTask) * 100) : 0;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white">📊 Aperçu des Tâches</h2>

      {/* Barre de progression */}
      <div className="w-full h-8 bg-gray-700 rounded-full overflow-hidden flex">
        <div
          className="bg-green-500 h-full transition-all duration-500"
          style={{ width: `${completedPercent}%` }}
        />
        <div
          className="bg-yellow-500 h-full transition-all duration-500"
          style={{ width: `${pendingPercent}%` }}
        />
        <div
          className="bg-red-600 h-full transition-all duration-500"
          style={{ width: `${failedPercent}%` }}
        />
      </div>

      {/* Résumé */}
      <div className="mt-4 flex justify-between text-white">
        <p className="text-lg">
          ✅ Terminées : <span className="font-bold">{completedPercent}%</span>
        </p>
        <p className="text-lg">
          ⏳ En attente : <span className="font-bold">{pendingPercent}%</span>
        </p>
        <p className="text-lg">
          ❌ Échouées : <span className="font-bold">{failedPercent}%</span>
        </p>
      </div>

      {/* Détails */}
      <div className="mt-4 bg-gray-800 p-4 rounded-lg text-white flex justify-around">
        <div className="text-center">
          <p className="text-gray-400">Total des tâches</p>
          <p className="text-xl font-bold">{TotalTask}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Terminées</p>
          <p className="text-xl font-bold">{CompletedTask}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">En attente</p>
          <p className="text-xl font-bold">{PendingTask}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Échouées</p>
          <p className="text-xl font-bold">{FailedTask}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskInsights;