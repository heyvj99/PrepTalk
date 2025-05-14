import { useState } from "react";
import { Button } from "./ui/button";
import { Timer } from "./Timer";
import { useSettings } from "./SettingsContext";
import { useActivityHistory } from "./ActivityHistoryContext";
import { questions } from "../data/questions";

export function QuestionScreen() {
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
        <div className="w-64 bg-neutral-100 flex flex-col items-center justify-center p-2">
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
