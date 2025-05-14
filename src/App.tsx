import { Routes, Route, useNavigate } from "react-router-dom";
import { SettingsProvider } from "./components/SettingsContext";
import { ActivityHistoryProvider } from "./components/ActivityHistoryContext";
import { Layout } from "./components/Layout";
import { QuestionScreen } from "./components/QuestionScreen";
import { SettingsModal } from "./components/Settings";
import { ActivityHistory } from "./components/ActivityHistory";

function App() {
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
      <ActivityHistoryProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<QuestionScreen />} />
            <Route
              path="settings"
              element={
                <SettingsModal
                  onClose={handleSettingsClose}
                  onSave={handleSettingsSave}
                />
              }
            />
            <Route path="history" element={<ActivityHistory />} />
          </Route>
        </Routes>
      </ActivityHistoryProvider>
    </SettingsProvider>
  );
}

export default App;
