// src/hooks/usePageTracking.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const globalWindow = window as any; // Cast to any
    if (typeof globalWindow.gtag === "function") {
      globalWindow.gtag("config", "G-CTQKYGERDJ", {
        page_path: location.pathname,
      });
    }
  }, [location]);
}
