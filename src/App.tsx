import { Routes, Route, useNavigate } from "react-router-dom";
import { SettingsProvider, useSettings } from "./components/SettingsContext";
// import { ActivityHistoryProvider } from "./components/ActivityHistoryContext";
import { Layout } from "./components/Layout";
import { QuestionScreen } from "./components/QuestionScreen";
import { SettingsModal } from "./components/Settings";
import { usePageTracking } from "./usePageTracking.ts";

// import { ActivityHistory } from "./components/ActivityHistory";

function SettingsModalWithContext(props: any) {
  const { thinkingDuration, answeringDuration } = useSettings();
  return (
    <SettingsModal
      initialThinking={thinkingDuration}
      initialAnswering={answeringDuration}
      {...props}
    />
  );
}

function App() {
  usePageTracking();
  const navigate = useNavigate();

  const handleSettingsSave = (settings: any) => {
    console.log(settings);
    navigate(-1);
  };

  const handleSettingsClose = () => {
    navigate(-1); // or navigate("/") or whatever route you want
  };

  return (
    <SettingsProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<QuestionScreen />} />
          <Route
            path="settings"
            element={
              <SettingsModalWithContext
                onClose={handleSettingsClose}
                onSave={handleSettingsSave}
              />
            }
          />
        </Route>
      </Routes>
    </SettingsProvider>
  );
}

export default App;
