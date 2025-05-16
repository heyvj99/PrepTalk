import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { SettingsProvider, useSettings } from "./components/SettingsContext";
import ReactGA from "react-ga4";
import { useEffect } from "react";
import { Layout } from "./components/Layout";
import { QuestionScreen } from "./components/QuestionScreen";
import { SettingsModal } from "./components/Settings";
// import { usePageTracking } from "./usePageTracking.ts";

ReactGA.initialize("G-CTQKYGERDJ");

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
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

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
