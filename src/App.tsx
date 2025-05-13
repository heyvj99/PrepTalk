import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { questions } from "./data/questions";
import { Timer } from "./components/Timer";
import { SettingsProvider, useSettings } from "./components/SettingsContext";
import {
  ActivityHistoryProvider,
  useActivityHistory,
} from "./components/ActivityHistoryContext";
import { History, Settings as SettingsIcon } from "lucide-react";

function Layout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-2 border-b-4 border-black bg-white">
        <span className="font-extrabold text-2xl tracking-tight text-black">
          Interview Practice
        </span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/history")}
            className="text-2xl border-2 border-black bg-white hover:bg-neutral-200 rounded-none"
          >
            <History className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="text-2xl border-2 border-black bg-white hover:bg-neutral-200 rounded-none"
          >
            <SettingsIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

function QuestionScreen() {
  const [questionIdx, setQuestionIdx] = useState(() =>
    Math.floor(Math.random() * questions.length)
  );
  const [phase, setPhase] = useState<"thinking" | "answering">("thinking");
  const [key, setKey] = useState(0); // for resetting timer
  const { thinkingDuration, answeringDuration, soundEnabled } = useSettings();
  const { addEntry } = useActivityHistory();
  const [startTime, setStartTime] = useState(() => new Date());

  const playSound = () => {
    if (soundEnabled) {
      const audio = new Audio(
        "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c82.mp3"
      );
      audio.play();
    }
  };

  const handleTimerComplete = () => {
    playSound();
    if (phase === "thinking") {
      setPhase("answering");
      setKey((k) => k + 1);
    } else {
      // Log activity when answering phase ends
      addEntry({
        question: questions[questionIdx],
        startTime: startTime.toISOString(),
        endTime: new Date().toISOString(),
      });
    }
  };

  const handleSkip = () => {
    if (phase === "thinking") {
      setPhase("answering");
      setKey((k) => k + 1);
    } else {
      // Optionally log activity on skip
      addEntry({
        question: questions[questionIdx],
        startTime: startTime.toISOString(),
        endTime: new Date().toISOString(),
      });
    }
  };

  const goToPrev = () => {
    setPhase("thinking");
    setQuestionIdx((idx) => (idx - 1 + questions.length) % questions.length);
    setKey((k) => k + 1);
    setStartTime(new Date());
  };
  const goToNext = () => {
    setPhase("thinking");
    setQuestionIdx((idx) => (idx + 1) % questions.length);
    setKey((k) => k + 1);
    setStartTime(new Date());
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="bg-white border-4 border-black w-full max-w-3xl flex flex-row overflow-hidden">
        {/* Question Section */}
        <div className="flex-1 flex flex-col justify-center p-8 min-h-[260px] border-r-4 border-black">
          <span className="text-blue-700 font-extrabold text-lg mb-2 uppercase tracking-wide">
            Question
          </span>
          <p className="text-3xl font-extrabold leading-snug text-left text-black">
            {questions[questionIdx]}
          </p>
        </div>
        {/* Timer Section */}
        <div className="w-64 bg-neutral-100 flex flex-col items-center justify-center p-8">
          <Timer
            key={key}
            duration={
              phase === "thinking" ? thinkingDuration : answeringDuration
            }
            onComplete={handleTimerComplete}
            phase={phase === "thinking" ? "Thinking" : "Answering"}
            onSkip={handleSkip}
          />
        </div>
      </div>
      {/* Navigation */}
      <div className="flex w-full max-w-3xl mt-6">
        <Button
          variant="secondary"
          className="flex-1 border-4 border-black rounded-none text-2xl py-4 font-extrabold bg-white hover:bg-neutral-200 text-black"
          onClick={goToPrev}
        >
          &larr;
        </Button>
        <Button
          variant="secondary"
          className="flex-1 border-4 border-black rounded-none text-2xl py-4 font-extrabold bg-white hover:bg-neutral-200 text-black"
          onClick={goToNext}
        >
          &rarr;
        </Button>
      </div>
    </div>
  );
}

function Settings() {
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

function ActivityHistory() {
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

function App() {
  return (
    <SettingsProvider>
      <ActivityHistoryProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<QuestionScreen />} />
            <Route path="settings" element={<Settings />} />
            <Route path="history" element={<ActivityHistory />} />
          </Route>
        </Routes>
      </ActivityHistoryProvider>
    </SettingsProvider>
  );
}

export default App;
