import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  User,
  UserCircle,
} from "lucide-react";
import { logout } from "../../utils/authService";

function Navbar({ title, onToggleSidebar }) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* Left side */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate font-raleway text-lg font-bold text-gray-900">
            {title}
          </h1>
        </div>
      </div>

      {/* Profile */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setProfileOpen((previous) => !previous)}
          aria-expanded={profileOpen}
          aria-haspopup="menu"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <UserCircle size={32} className="shrink-0 text-primary" />

          <div className="hidden text-left sm:block">
            <p className="text-sm font-bold leading-4 text-gray-800">Admin</p>

            <p className="mt-0.5 text-[11px] text-gray-500">Administrator</p>
          </div>

          <ChevronDown
            size={15}
            className={`hidden text-gray-500 transition-transform sm:block ${
              profileOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {profileOpen && (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-52 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
          >
            {/* <button
              type="button"
              role="menuitem"
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <User size={17} />
              Profile
            </button>

            <button
              type="button"
              role="menuitem"
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <Settings size={17} />
              Settings
            </button>
            <div className="my-1 border-t border-gray-100" /> */}

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
