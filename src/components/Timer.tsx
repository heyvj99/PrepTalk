import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, EyeOff } from "lucide-react";

interface TimerProps {
  duration: number; // in seconds
  onComplete: () => void;
  phase: string;
  onSkip: () => void;
}

export function Timer({ duration, onComplete, phase, onSkip }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset timer on duration change
  useEffect(() => {
    setTimeLeft(duration);
    setPaused(false);
  }, [duration]);

  // Handle timer interval
  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [paused, onComplete]);

  const percent = (timeLeft / duration) * 100;

  const handlePause = () => setPaused((p) => !p);
  const handleReset = () => setTimeLeft(duration);

  return (
    <div className="w-full flex flex-col items-center">
      <span className="text-blue-700 font-semibold text-sm mb-1">Timer</span>
      <div className="flex items-center justify-between w-full mb-2">
        <span className="text-black font-medium text-base">{phase}</span>
        <div className="flex gap-2">
          <button onClick={handlePause} className="p-1" title="Pause/Resume">
            {paused ? (
              <Play className="w-5 h-5" />
            ) : (
              <Pause className="w-5 h-5" />
            )}
          </button>
          <button onClick={handleReset} className="p-1" title="Reset">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button onClick={onSkip} className="p-1" title="Skip">
            <EyeOff className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="text-5xl font-mono font-bold tracking-widest mb-2">
        {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
        {String(timeLeft % 60).padStart(2, "0")}
      </div>
      <div className="w-full h-3 bg-gray-200 rounded">
        <div
          className="h-3 bg-blue-600 rounded transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
