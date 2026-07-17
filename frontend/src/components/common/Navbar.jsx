import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, UserCircle, User, Settings, LogOut } from "lucide-react";
import { logout } from "../../utils/authService";

function Navbar({ title, subtitle, onToggleSidebar }) {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-5 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="text-gray-700 transition hover:text-primary"
        >
          <Menu size={24} />
        </button>

        <div>
          <h2 className="font-raleway text-lg font-bold text-gray-900">
            {title}
          </h2>

          <p className="font-voces text-xs text-secondary">{subtitle}</p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
        >
          <UserCircle size={36} className="text-primary" />
          <div className="text-left">
            <p className="font-bold text-gray-800 text-sm">Admin</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </button>

        {profileOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-gray-700">
              <User size={18} />
              Profile
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-gray-700">
              <Settings size={18} />
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
