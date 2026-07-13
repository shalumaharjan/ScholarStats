import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  CloudDownload,
  FileText,
  FolderOpen,
  GraduationCap,
  Home,
  LogOut,
  PieChart,
  UploadCloud,
} from "lucide-react";

function Sidebar({ isSidebarCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Student Files", icon: FolderOpen, path: "/student-files" },
    { name: "Fetch Result", icon: CloudDownload, path: "/fetch-result" },
    { name: "Fetch Status", icon: BarChart3, path: "/fetch-status" },
    { name: "Upload Report", icon: UploadCloud, path: "/upload-report" },
    { name: "Semester Analysis", icon: PieChart, path: "/semester-analysis" },
    { name: "Reports", icon: FileText, path: "/reports" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <aside
      className={`${
        isSidebarCollapsed ? "w-20 px-3" : "w-64 px-5"
      } sticky top-0 hidden h-screen shrink-0 flex-col overflow-y-auto bg-[#0b2c63] py-6 text-white transition-all duration-300 lg:flex`}
    >
      <div
        className={`flex items-center ${
          isSidebarCollapsed ? "justify-center" : "gap-3"
        }`}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
          <GraduationCap size={26} />
        </div>

        {!isSidebarCollapsed && (
          <div>
            <h1 className="font-raleway text-xl font-extrabold">
              ScholarStats
            </h1>
            <p className="font-voces text-xs text-blue-100">
              Academic Result Analyzer
            </p>
          </div>
        )}
      </div>

      <div className="my-7 h-px bg-white/20"></div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.name}
              title={isSidebarCollapsed ? item.name : ""}
              onClick={() => navigate(item.path)}
              className={`flex items-center rounded-xl py-3 text-sm font-semibold transition ${
                isSidebarCollapsed ? "justify-center px-0" : "gap-3 px-4"
              } ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-blue-900/30"
                  : "text-blue-100 hover:bg-white/10"
              }`}
            >
              <Icon size={19} />

              {!isSidebarCollapsed && <span>{item.name}</span>}
            </button>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        title={isSidebarCollapsed ? "Logout" : ""}
        className={`mt-auto flex items-center rounded-xl py-3 text-sm font-semibold text-blue-100 transition hover:bg-white/10 ${
          isSidebarCollapsed ? "justify-center px-0" : "gap-3 px-4"
        }`}
      >
        <LogOut size={19} />

        {!isSidebarCollapsed && <span>Logout</span>}
      </button>
    </aside>
  );
}

export default Sidebar;
