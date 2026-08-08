import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  CloudDownload,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  GraduationCap,
  Home,
  PieChart,
} from "lucide-react";

function Sidebar({ isSidebarCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "Student Files",
      icon: FolderOpen,
      path: "/student-files",
    },
    {
      name: "Fetch Result",
      icon: CloudDownload,
      path: "/fetch-result",
    },
    {
      name: "Fetch Status",
      icon: BarChart3,
      path: "/fetch-status",
    },
    {
      name: "Result Files",
      icon: FileSpreadsheet,
      path: "/result-files",
    },
    {
      name: "Semester Analysis",
      icon: PieChart,
      path: "/semester-analysis",
    },
    {
      name: "Reports",
      icon: FileText,
      path: "/reports",
    },
  ];

  return (
    <aside
      className={`sticky top-0 hidden h-screen shrink-0 flex-col overflow-y-auto border-r border-white/10 bg-[#111827] py-5 text-white transition-all duration-300 lg:flex ${
        isSidebarCollapsed ? "w-[76px] px-3" : "w-60 px-4"
      }`}
    >
      {/* Brand */}
      <div
        className={`flex h-12 items-center ${
          isSidebarCollapsed ? "justify-center" : "gap-3"
        }`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
          <GraduationCap size={23} />
        </div>

        {!isSidebarCollapsed && (
          <div className="min-w-0">
            <h1 className="truncate font-raleway text-lg font-extrabold">
              ScholarStats
            </h1>

            <p className="truncate font-voces text-[11px] text-gray-400">
              Academic Result Analyzer
            </p>
          </div>
        )}
      </div>

      <div className="my-5 h-px bg-white/10" />

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.name}
              type="button"
              title={isSidebarCollapsed ? item.name : undefined}
              aria-label={isSidebarCollapsed ? item.name : undefined}
              onClick={() => navigate(item.path)}
              className={`flex h-11 w-full items-center rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                isSidebarCollapsed ? "justify-center px-0" : "gap-3 px-3"
              } ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} className="shrink-0" />

              {!isSidebarCollapsed && (
                <span className="truncate">{item.name}</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
