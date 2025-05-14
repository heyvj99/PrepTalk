import { Routes, Route } from "react-router-dom";
import { SettingsProvider } from "./components/SettingsContext";
import { ActivityHistoryProvider } from "./components/ActivityHistoryContext";
import { Layout } from "./components/Layout";
import { QuestionScreen } from "./components/QuestionScreen";
import { Settings } from "./components/Settings";
import { ActivityHistory } from "./components/ActivityHistory";

function App() {
  return (
    <SettingsProvider>
      <ActivityHistoryProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<QuestionScreen />} />
            <Route path="settings" element={<Settings />} />
            <Route path="history" element={<ActivityHistory />} />
          </Route>
        </Routes>
      </ActivityHistoryProvider>
    </SettingsProvider>
  );
}

export default App;
