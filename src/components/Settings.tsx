import { useSettings } from "./SettingsContext";

export function Settings() {
  const {
    thinkingDuration,
    answeringDuration,
    soundEnabled,
    setThinkingDuration,
    setAnsweringDuration,
    setSoundEnabled,
  } = useSettings();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="bg-white rounded shadow p-6 w-full max-w-xl text-center">
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Thinking Timer (seconds)
          </label>
          <input
            type="number"
            min={5}
            max={300}
            value={thinkingDuration}
            onChange={(e) => setThinkingDuration(Number(e.target.value))}
            className="border rounded px-2 py-1 w-32 text-center"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Answering Timer (seconds)
          </label>
          <input
            type="number"
            min={10}
            max={600}
            value={answeringDuration}
            onChange={(e) => setAnsweringDuration(Number(e.target.value))}
            className="border rounded px-2 py-1 w-32 text-center"
          />
        </div>
        <div className="mb-4 flex items-center justify-center gap-2">
          <input
            id="sound-toggle"
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
            className="accent-blue-600"
          />
          <label htmlFor="sound-toggle" className="font-medium cursor-pointer">
            Enable sound notifications
          </label>
        </div>
      </div>
    </div>
  );
}
