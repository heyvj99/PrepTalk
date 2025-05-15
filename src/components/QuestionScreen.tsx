import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Timer } from "./Timer";
import { useSettings } from "./SettingsContext";
// import { useActivityHistory } from "./ActivityHistoryContext";
import { questions as allQuestions } from "../data/questions";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function QuestionScreen() {
  const { thinkingDuration, answeringDuration, topic } = useSettings();
  const [questionIdx, setQuestionIdx] = useState(0);
  const [startTime, setStartTime] = useState(() => new Date());

  // Treat 0 as 'none' for both durations
  const noAnswering = !answeringDuration;
  const noThinking = !thinkingDuration;

  // Filter questions by topic
  const filteredQuestions =
    topic && topic !== "all"
      ? allQuestions.filter((q) => q.topic === topic)
      : allQuestions;

  // Determine initial phase
  const initialPhase: "thinking" | "answering" = noThinking
    ? "answering"
    : "thinking";
  const [phase, setPhase] = useState<"thinking" | "answering">(initialPhase);
  const [key, setKey] = useState(0); // for resetting timer

  // Reset questionIdx and phase when topic changes
  useEffect(() => {
    setQuestionIdx(0);
    setPhase(noThinking ? "answering" : "thinking");
    setKey((k) => k + 1);
    setStartTime(new Date());
    // eslint-disable-next-line
  }, [topic, thinkingDuration, answeringDuration]);

  // No logging in activity history
  const handleTimerComplete = () => {
    if (phase === "thinking") {
      setPhase("answering");
      setKey((k) => k + 1);
    }
  };

  // Only phase change, no addEntry here
  const handleSkip = () => {
    if (phase === "thinking") {
      setPhase("answering");
      setKey((k) => k + 1);
    }
  };

  // No logging in goToPrev
  const goToPrev = () => {
    setPhase(noThinking ? "answering" : "thinking");
    setQuestionIdx(
      (idx) => (idx - 1 + filteredQuestions.length) % filteredQuestions.length
    );
    setKey((k) => k + 1);
    setStartTime(new Date());
  };
  //
  const goToNext = () => {
    setPhase(noThinking ? "answering" : "thinking");
    setQuestionIdx((idx) => (idx + 1) % filteredQuestions.length);
    setKey((k) => k + 1);
    setStartTime(new Date());
  };

  const currentQuestion = filteredQuestions[questionIdx];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="border-2 border-black w-full h-[40vh] max-w-3xl flex flex-row overflow-hidden">
        {/* Question Section */}
        <div className="flex-1 flex flex-col justify-start p-5 min-h-[260px] border-r-2 border-black">
          <span className="text-blue-700 font-bold text-sm mb-2 uppercase tracking-wide">
            Question
          </span>
          <div className="flex flex-col justify-center items-start">
            <p className="text-4xl font-bold leading-snug text-left text-black">
              {currentQuestion.text}
            </p>
            <span className="mt-2 px-3 py-1 text-xs bg-neutral-200 text-neutral-700 font-semibold uppercase tracking-wide">
              {currentQuestion.topic
                .replace(/^(.)/, (c) => c.toUpperCase())
                .replace(/_/g, " ")}
            </span>
          </div>
        </div>
        {/* Timer Section */}
        <div className="w-64 bg-neutral-100 flex flex-col items-start justify-start p-0">
          {!noAnswering && (
            <Timer
              key={key}
              duration={
                phase === "thinking" ? thinkingDuration : answeringDuration
              }
              onComplete={handleTimerComplete}
              phase={phase === "thinking" ? "Thinking" : "Answering"}
              onSkip={handleSkip}
            />
          )}
        </div>
      </div>
      {/* Navigation */}
      <div className="flex w-full max-w-3xl mt-6 gap-[2px]">
        <Button
          variant="secondary"
          className="flex-1 border-4 border-black rounded-none text-2xl h-[64px] font-extrabold bg-black hover:bg-black/95 text-white"
          onClick={goToPrev}
        >
          <ArrowLeft size={64} className="size-8" />
        </Button>
        <Button
          variant="secondary"
          className="flex-1 border-4 border-black rounded-none text-2xl h-[64px] font-extrabold bg-black hover:bg-black/95 text-white"
          onClick={goToNext}
        >
          <ArrowRight size={64} className="size-8" />
        </Button>
      </div>
    </div>
  );
}
