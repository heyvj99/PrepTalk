import React from "react";
import { History, Settings as SettingsIcon } from "lucide-react";
import { questions } from "../data/questions";

interface ActivityHistoryModalProps {
  onClose: () => void;
  onSettings: () => void;
  onHistory: () => void;
}

export function ActivityHistoryModal({
  onClose,
  onSettings,
  onHistory,
}: ActivityHistoryModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white border-2 border-black shadow-xl rounded-none w-full max-w-2xl p-0 relative">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between border-b-2 border-black px-0 py-0 h-12">
          <div className="flex-1" />
          <div className="flex gap-0 items-center">
            <button
              className="h-12 w-12 flex items-center justify-center bg-black text-white border-l-2 border-black focus:outline-none"
              aria-label="History"
              onClick={onHistory}
            >
              <History className="w-6 h-6" />
            </button>
            <button
              className="h-12 w-12 flex items-center justify-center bg-white text-black border-l-2 border-black focus:outline-none"
              aria-label="Settings"
              onClick={onSettings}
            >
              <SettingsIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-black">
          <span className="font-semibold text-lg text-black text-left">
            All questions for this session
          </span>
          <button
            aria-label="Close"
            onClick={onClose}
            className="text-3xl font-bold text-black hover:text-neutral-600 focus:outline-none"
          >
            &times;
          </button>
        </div>
        {/* Question List */}
        <div className="px-8 py-4 max-h-[60vh] overflow-y-auto">
          <ul className="flex flex-col gap-0">
            {questions.map((q, i) => (
              <React.Fragment key={i}>
                <li className="flex items-center py-3">
                  <span className="w-12 text-right font-mono text-xl font-medium text-black select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="ml-6 text-lg text-black text-left">
                    {q.text}
                  </span>
                </li>
                <hr className="border-t border-neutral-300" />
              </React.Fragment>
            ))}
            {/* Render extra empty dividers for future questions */}
            {Array.from({ length: 3 }).map((_, idx) => (
              <React.Fragment key={questions.length + idx}>
                <li className="h-10" />
                <hr className="border-t border-neutral-300" />
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
