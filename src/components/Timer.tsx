import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";

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

  const handlePause = () => {
    if (timeLeft === 0) {
      // If timer is at 0, reset to full duration when resuming
      setTimeLeft(duration);
    }
    setPaused((p) => !p);
  };

  const handleReset = () => setTimeLeft(duration);

  const handleSkip = () => {
    if (phase === "Thinking") {
      onSkip();
    } else {
      // In answering phase, reset timer to 0 and pause
      setTimeLeft(0);
      setPaused(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-between border-0 border-black p-5">
      <div className="flex items-start justify-start w-full mb-2">
        <span
          className={`font-bold text-sm uppercase ${
            phase === "Thinking" ? "text-green-700" : "text-blue-700"
          }`}
        >
          {phase === "Thinking" ? "Think..." : "Answer"}
        </span>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="text-5xl font-mono font-medium tracking-wide mb-2 text-black">
          {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
          {String(timeLeft % 60).padStart(2, "0")}
        </div>
        <div className="w-full h-3 border-2 border-black">
          <div
            className="h-full bg-blue-600"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <div className="flex gap-[2px] w-full">
        <button
          onClick={handlePause}
          className="p-1 mx-auto flex-1 border-2 border-black hover:bg-neutral-200 rounded-none flex items-center justify-center"
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
          className="p-1 flex-1 border-2 border-black hover:bg-neutral-200 rounded-none flex items-center justify-center"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={handleSkip}
          className="p-1 flex-1 border-2 border-black hover:bg-neutral-200 rounded-none flex items-center justify-center"
          title={phase === "Thinking" ? "Skip to Answering" : "Reset to 00:00"}
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
