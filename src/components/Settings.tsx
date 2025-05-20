import React, { useState } from "react";
import { useSettings } from "./SettingsContext";

const THINKING_OPTIONS = [
  { label: "None", value: 0 },
  { label: "30 sec", value: 30 },
  { label: "60 sec", value: 60 },
];

const ANSWERING_OPTIONS = [
  { label: "None", value: 0 },
  { label: "1 min", value: 60 },
  { label: "2 min", value: 120 },
  { label: "3 min", value: 180 },
];

const TOPIC_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Previous Experience", value: "Previous Experience" },
  { label: "Behavioral Questions", value: "Behavioral Question" },
  { label: "Situational Questions", value: "Situational Question" },
  { label: "Culture Fit Questions", value: "Culture Fit" },
];

export function SettingsModal({
  onClose,
  onSave,
  initialThinking = 0,
  initialAnswering = 0,
  initialTopic = "all",
}: {
  onClose: () => void;
  onSave: (settings: {
    thinking: number;
    answering: number;
    topic: string;
  }) => void;
  initialThinking?: number;
  initialAnswering?: number;
  initialTopic?: string;
}) {
  const { setThinkingDuration, setAnsweringDuration, topic, setTopic } =
    useSettings();
  const [thinking, setThinking] = useState<number>(initialThinking);
  const [answering, setAnswering] = useState<number>(initialAnswering);

  // If answering is set to none, force thinking to none
  const handleAnsweringChange = (val: number) => {
    setAnswering(val);
    if (val === 0) setThinking(0);
  };

  // If thinking is set to none, do not affect answering
  const handleThinkingChange = (val: number) => {
    setThinking(val);
  };

  const handleSave = () => {
    // If answering is none, force thinking to none
    const finalAnswering = answering;
    const finalThinking = finalAnswering === 0 ? 0 : thinking;
    setThinkingDuration(finalThinking);
    setAnsweringDuration(finalAnswering);
    onSave({ thinking: finalThinking, answering: finalAnswering, topic });
  };

  return (
    <div
      className="fixed p-4 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div className="bg-neutral-100 border-2 border-black shadow-xl rounded-none w-full max-w-2xl p-0 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black px-8 py-4">
          <span
            id="settings-title"
            className="font-semibold text-lg tracking-wide text-black uppercase"
          >
            PRACTICE SETTINGS
          </span>
          <button
            aria-label="Close settings"
            onClick={onClose}
            className="text-3xl font-bold text-black hover:text-neutral-600 focus:outline-none"
          >
            &times;
          </button>
        </div>
        {/* Content */}
        <div className="px-8 py-6 flex flex-col gap-6">
          {/* Thinking Time */}
          <section>
            <div className="font-bold text-base mb-2">Thinking Time</div>
            <div className="flex gap-2">
              {THINKING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={thinking === opt.value}
                  onClick={() => handleThinkingChange(opt.value)}
                  disabled={answering === 0}
                  className={`px-5 py-2 rounded-full border-2 border-black text-base font-medium transition-all duration-200
                    ${
                      thinking === opt.value
                        ? "bg-black text-white hover:bg-black/90"
                        : "bg-white text-black hover:bg-neutral-100"
                    }
                    ${answering === 0 ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>
          <hr className="border-t border-neutral-300" />
          {/* Answering Time */}
          <section>
            <div className="font-bold text-base mb-2">Answering Time</div>
            <div className="flex gap-2">
              {ANSWERING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={answering === opt.value}
                  onClick={() => handleAnsweringChange(opt.value)}
                  className={`px-5 py-2 rounded-full border-2 border-black text-base font-medium transition-all duration-200
                    ${
                      answering === opt.value
                        ? "bg-black text-white hover:bg-black/90"
                        : "bg-white text-black hover:bg-neutral-100"
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>
          <hr className="border-t border-neutral-300" />
          {/* Topics */}
          <section>
            <div className="font-bold text-base mb-2">Topics</div>
            <div className="flex flex-wrap gap-2">
              {TOPIC_OPTIONS.map((opt, i) => (
                <React.Fragment key={opt.value}>
                  {i === 1 && (
                    <span className="mx-1 border-l border-neutral-400 h-6 align-middle" />
                  )}
                  <button
                    type="button"
                    aria-pressed={topic === opt.value}
                    onClick={() => setTopic(opt.value)}
                    className={`px-5 py-2 rounded-full border-2 border-black text-base font-medium transition-all duration-200
                      ${
                        topic === opt.value
                          ? "bg-black text-white hover:bg-black/90"
                          : "bg-white text-black hover:bg-neutral-100"
                      }
                    `}
                  >
                    {opt.label}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </section>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-end gap-4 border-t border-neutral-300 px-8 py-4">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-2 border-2 border-black bg-white text-black font-medium rounded-none hover:bg-neutral-100 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-8 py-2 border-2 border-black bg-black text-white font-medium rounded-none hover:bg-black/90 hover:scale-105 transition-all duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
