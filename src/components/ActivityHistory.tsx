import { useActivityHistory } from "./ActivityHistoryContext";

export function ActivityHistory() {
  const { history, clearHistory } = useActivityHistory();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h2 className="text-2xl font-semibold mb-4">Activity History</h2>
      <div className="bg-white rounded shadow p-6 w-full max-w-2xl text-center">
        {history.length === 0 ? (
          <p>No activity yet.</p>
        ) : (
          <>
            <table className="w-full text-left mb-4">
              <thead>
                <tr>
                  <th className="py-2 px-2">Question</th>
                  <th className="py-2 px-2">Start</th>
                  <th className="py-2 px-2">End</th>
                  <th className="py-2 px-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, i) => {
                  const start = new Date(entry.startTime);
                  const end = new Date(entry.endTime);
                  const duration = Math.round(
                    (end.getTime() - start.getTime()) / 1000
                  );
                  return (
                    <tr key={i} className="border-t">
                      <td className="py-2 px-2">{entry.question}</td>
                      <td className="py-2 px-2 text-xs">
                        {start.toLocaleString()}
                      </td>
                      <td className="py-2 px-2 text-xs">
                        {end.toLocaleString()}
                      </td>
                      <td className="py-2 px-2">{duration}s</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded border border-red-300"
              onClick={clearHistory}
            >
              Clear History
            </button>
          </>
        )}
      </div>
    </div>
  );
}
