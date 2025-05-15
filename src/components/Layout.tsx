import { useNavigate, Outlet } from "react-router-dom";
import { Button } from "./ui/button";
import { Settings as SettingsIcon } from "lucide-react";

export function Layout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-2 border-b-4 border-black bg-white">
        <span className="font-extrabold text-2xl tracking-tight text-black">
          PrepTalk
        </span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="text-2xl border-2 border-black bg-white hover:bg-neutral-200 rounded-none"
          >
            <SettingsIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {/* Main content */}
      <div className="p-4 flex-1 flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
