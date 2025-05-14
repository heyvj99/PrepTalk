import React, { useState } from "react";

const THINKING_OPTIONS = [
  { label: "None", value: "none" },
  { label: "30 sec", value: 30 },
  { label: "60 sec", value: 60 },
];

const ANSWERING_OPTIONS = [
  { label: "None", value: "none" },
  { label: "1 min", value: 60 },
  { label: "2 min", value: 120 },
  { label: "3 min", value: 180 },
];

const TOPIC_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Previous Experience", value: "previous" },
  { label: "Behavioral Questions", value: "behavioral" },
  { label: "Situational Questions", value: "situational" },
  { label: "Culture Fit Questions", value: "culture" },
];

export function SettingsModal({
  onClose,
  onSave,
  initialThinking = "none",
  initialAnswering = "none",
  initialTopic = "all",
}: {
  onClose: () => void;
  onSave: (settings: {
    thinking: string | number;
    answering: string | number;
    topic: string;
  }) => void;
  initialThinking?: string | number;
  initialAnswering?: string | number;
  initialTopic?: string;
}) {
  const [thinking, setThinking] = useState<string | number>(initialThinking);
  const [answering, setAnswering] = useState<string | number>(initialAnswering);
  const [topic, setTopic] = useState<string>(initialTopic);

  const handleSave = () => {
    onSave({ thinking, answering, topic });
  };

  return (
    <div
      className="fixed z-50 flex items-center justify-center bg-black bg-opacity-10"
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
                  onClick={() => setThinking(opt.value)}
                  className={`px-5 py-2 rounded-full border-2 border-black text-base font-medium transition-colors
                    ${
                      thinking === opt.value
                        ? "bg-black text-white"
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
          {/* Answering Time */}
          <section>
            <div className="font-bold text-base mb-2">Answering Time</div>
            <div className="flex gap-2">
              {ANSWERING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={answering === opt.value}
                  onClick={() => setAnswering(opt.value)}
                  className={`px-5 py-2 rounded-full border-2 border-black text-base font-medium transition-colors
                    ${
                      answering === opt.value
                        ? "bg-black text-white"
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
                    className={`px-5 py-2 rounded-full border-2 border-black text-base font-medium transition-colors
                      ${
                        topic === opt.value
                          ? "bg-black text-white"
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
            className="px-8 py-2 border-2 border-black bg-white text-black font-medium rounded-none hover:bg-neutral-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-8 py-2 border-2 border-black bg-black text-white font-medium rounded-none hover:bg-neutral-800 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
