import React, { createContext, useContext, useEffect, useState } from "react";

interface Settings {
  thinkingDuration: number;
  answeringDuration: number;
  soundEnabled: boolean;
  setThinkingDuration: (v: number) => void;
  setAnsweringDuration: (v: number) => void;
  setSoundEnabled: (v: boolean) => void;
}

const SettingsContext = createContext<Settings | undefined>(undefined);

const SETTINGS_KEY = "interview_settings";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [thinkingDuration, setThinkingDuration] = useState(30);
  const [answeringDuration, setAnsweringDuration] = useState(120);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.thinkingDuration) setThinkingDuration(parsed.thinkingDuration);
      if (parsed.answeringDuration)
        setAnsweringDuration(parsed.answeringDuration);
      if (typeof parsed.soundEnabled === "boolean")
        setSoundEnabled(parsed.soundEnabled);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({ thinkingDuration, answeringDuration, soundEnabled })
    );
  }, [thinkingDuration, answeringDuration, soundEnabled]);

  return (
    <SettingsContext.Provider
      value={{
        thinkingDuration,
        answeringDuration,
        soundEnabled,
        setThinkingDuration,
        setAnsweringDuration,
        setSoundEnabled,
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
