import React, { createContext, useContext, useEffect, useState } from "react";
import { questions } from "../data/questions";

export interface ActivityEntry {
  question: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
}

interface ActivityHistoryContextType {
  history: ActivityEntry[];
  addEntry: (entry: ActivityEntry) => void;
  clearHistory: () => void;
}

const ActivityHistoryContext = createContext<
  ActivityHistoryContextType | undefined
>(undefined);
const HISTORY_KEY = "interview_activity_history";

export function ActivityHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [history, setHistory] = useState<ActivityEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const addEntry = (entry: ActivityEntry) => {
    setHistory((prev) => [...prev, entry]);
  };

  const clearHistory = () => setHistory([]);

  return (
    <ActivityHistoryContext.Provider
      value={{ history, addEntry, clearHistory }}
    >
      {children}
    </ActivityHistoryContext.Provider>
  );
}

export function useActivityHistory() {
  const ctx = useContext(ActivityHistoryContext);
  if (!ctx)
    throw new Error(
      "useActivityHistory must be used within ActivityHistoryProvider"
    );
  return ctx;
}
