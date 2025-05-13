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
    <div className="w-full flex flex-col items-center border-4 border-black bg-white p-4">
      <span className="text-blue-700 font-extrabold text-xs mb-1 uppercase tracking-wide">
        Timer
      </span>
      <div className="flex items-center justify-between w-full mb-2">
        <span className="text-black font-extrabold text-base uppercase">
          {phase}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePause}
            className="p-1 border-2 border-black bg-white hover:bg-neutral-200 rounded-none"
            title="Pause/Resume"
          >
            {paused ? (
              <Play className="w-5 h-5" />
            ) : (
              <Pause className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={handleReset}
            className="p-1 border-2 border-black bg-white hover:bg-neutral-200 rounded-none"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={onSkip}
            className="p-1 border-2 border-black bg-white hover:bg-neutral-200 rounded-none"
            title="Skip"
          >
            <EyeOff className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="text-5xl font-mono font-extrabold tracking-widest mb-2 text-black">
        {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
        {String(timeLeft % 60).padStart(2, "0")}
      </div>
      <div className="w-full h-3 bg-white border-2 border-black">
        <div className="h-3 bg-blue-600" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
