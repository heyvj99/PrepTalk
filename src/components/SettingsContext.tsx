import React, { createContext, useContext, useEffect, useState } from "react";

interface Settings {
  thinkingDuration: number;
  answeringDuration: number;
  topic: string;
  setThinkingDuration: (v: number) => void;
  setAnsweringDuration: (v: number) => void;
  setTopic: (v: string) => void;
}

const SettingsContext = createContext<Settings | undefined>(undefined);

const SETTINGS_KEY = "interview_settings";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [thinkingDuration, setThinkingDuration] = useState(30);
  const [answeringDuration, setAnsweringDuration] = useState(120);
  const [topic, _setTopic] = useState("all");

  const setTopic = (newTopic: string) => {
    _setTopic(newTopic);
  };

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.thinkingDuration === "number")
          setThinkingDuration(parsed.thinkingDuration);
        if (typeof parsed.answeringDuration === "number")
          setAnsweringDuration(parsed.answeringDuration);
        if (typeof parsed.topic === "string") {
          setTopic(parsed.topic);
        }
      } catch (e) {
        localStorage.removeItem(SETTINGS_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({ thinkingDuration, answeringDuration, topic })
    );
  }, [thinkingDuration, answeringDuration, topic]);

  return (
    <SettingsContext.Provider
      value={{
        thinkingDuration,
        answeringDuration,
        topic,
        setThinkingDuration,
        setAnsweringDuration,
        setTopic,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
