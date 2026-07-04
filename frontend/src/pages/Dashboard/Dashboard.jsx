import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BarChart3,
  BookOpen,
  CheckCircle,
  Clock,
  CloudDownload,
  FileText,
  FolderOpen,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  PieChart as PieChartIcon,
  UploadCloud,
  UserCircle,
  Users,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState("bar");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const summaryCards = [
    {
      title: "Total Students",
      value: "320",
      description: "Across all semesters",
      icon: Users,
    },
    {
      title: "Semesters Tracked",
      value: "8",
      description: "1st to 8th semester",
      icon: GraduationCap,
    },
    {
      title: "Result Files",
      value: "12",
      description: "Uploaded files",
      icon: FileText,
    },
    {
      title: "Fetch Jobs",
      value: "6",
      description: "Total fetch operations",
      icon: CloudDownload,
    },
    {
      title: "Average Pass Rate",
      value: "82.5%",
      description: "Department average",
      icon: BarChart3,
    },
    {
      title: "Total Backlogs",
      value: "91",
      description: "Across all semesters",
      icon: BookOpen,
    },
  ];

  const menuItems = [
    {
      name: "Dashboard",
      icon: Home,
      active: true,
    },
    {
      name: "Student Files",
      icon: FolderOpen,
      active: false,
    },
    {
      name: "Fetch Result",
      icon: CloudDownload,
      active: false,
    },
    {
      name: "Fetch Status",
      icon: BarChart3,
      active: false,
    },
    {
      name: "Upload Report",
      icon: UploadCloud,
      active: false,
    },
    {
      name: "Semester Analysis",
      icon: PieChartIcon,
      active: false,
    },
    {
      name: "Reports",
      icon: FileText,
      active: false,
    },
  ];

  const semesterPerformance = [
    { semester: "1st Sem", passRate: 78 },
    { semester: "2nd Sem", passRate: 81 },
    { semester: "3rd Sem", passRate: 75 },
    { semester: "4th Sem", passRate: 84 },
    { semester: "5th Sem", passRate: 80 },
    { semester: "6th Sem", passRate: 86 },
    { semester: "7th Sem", passRate: 83 },
    { semester: "8th Sem", passRate: 88 },
  ];

  const chartColors = [
    "#007bff",
    "#28a745",
    "#ffc107",
    "#dc3545",
    "#6f42c1",
    "#20c997",
    "#fd7e14",
    "#6c757d",
  ];

  const recentActivities = [
    {
      activity: "BCA Sixth Semester file uploaded",
      status: "Completed",
      date: "1 July 2026",
      time: "10:15 AM",
      icon: UploadCloud,
    },
    {
      activity: "Spring 2025 result fetch started",
      status: "Processing",
      date: "1 July 2026",
      time: "09:45 AM",
      icon: CloudDownload,
    },
    {
      activity: "Semester analysis generated",
      status: "Completed",
      date: "1 July 2026",
      time: "09:20 AM",
      icon: PieChartIcon,
    },
    {
      activity: "PDF report exported",
      status: "Completed",
      date: "30 June 2026",
      time: "04:30 PM",
      icon: FileText,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const renderPerformanceChart = () => {
    if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={290}>
          <LineChart data={semesterPerformance}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="semester" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="passRate"
              stroke="#007bff"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "pie") {
      return (
        <ResponsiveContainer width="100%" height={290}>
          <RechartsPieChart>
            <Pie
              data={semesterPerformance}
              dataKey="passRate"
              nameKey="semester"
              outerRadius={105}
              label
            >
              {semesterPerformance.map((item, index) => (
                <Cell
                  key={item.semester}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </RechartsPieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={290}>
        <BarChart data={semesterPerformance}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="semester" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="passRate" fill="#007bff" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] font-biryani text-gray-900">
      <div className="flex min-h-screen">
        <aside
          className={`${
            isSidebarCollapsed ? "w-20 px-3" : "w-64 px-5"
          } bg-[#0b2c63] text-white py-6 hidden lg:flex flex-col transition-all duration-300`}
        >
          <div
            className={`flex items-center ${
              isSidebarCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="h-11 w-11 rounded-xl bg-primary flex items-center justify-center">
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

          <div className="h-px bg-white/20 my-7"></div>

          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  title={isSidebarCollapsed ? item.name : ""}
                  className={`flex items-center rounded-xl py-3 text-sm font-semibold transition ${
                    isSidebarCollapsed ? "justify-center px-0" : "gap-3 px-4"
                  } ${
                    item.active
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
            className={`mt-auto flex items-center rounded-xl py-3 text-sm font-semibold text-blue-100 hover:bg-white/10 transition ${
              isSidebarCollapsed ? "justify-center px-0" : "gap-3 px-4"
            }`}
          >
            <LogOut size={19} />

            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </aside>

        <main className="flex-1">
          <header className="h-16 bg-white border-b border-gray-200 px-5 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="text-gray-700 hover:text-primary transition"
              >
                <Menu size={24} />
              </button>

              <div>
                <h2 className="font-raleway text-lg font-bold text-gray-900">
                  Dashboard
                </h2>
                <p className="font-voces text-xs text-secondary">
                  Department-wide academic result overview
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <UserCircle size={36} className="text-primary" />

              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-900">Admin</p>
                <p className="font-voces text-xs text-secondary">
                  Administrator
                </p>
              </div>
            </div>
          </header>

          <section className="p-5 lg:p-8">
            <div className="mb-6">
              <h1 className="font-raleway text-3xl font-extrabold text-gray-900">
                Dashboard
              </h1>
              <p className="font-voces mt-1 text-secondary">
                Overall academic result summary of the department
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                    <GraduationCap size={28} />
                  </div>

                  <div>
                    <p className="font-voces text-sm text-secondary">
                      Department
                    </p>

                    <h2 className="font-raleway text-xl font-bold text-gray-900">
                      Bachelor of Computer Application BCA
                    </h2>

                    <p className="mt-1 text-sm text-secondary">
                      Academic Year:{" "}
                      <span className="font-bold text-primary">2025</span>
                      <span className="mx-2 text-gray-300">|</span>
                      Total Semesters Tracked:{" "}
                      <span className="font-bold text-primary">8</span>
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
                  <p className="font-voces text-xs text-secondary">
                    Last Updated
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    1 July 2026, 10:30 AM
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {summaryCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition"
                  >
                    <div className="h-14 w-14 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                      <Icon size={26} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-700">
                        {card.title}
                      </p>

                      <h3 className="font-raleway text-3xl font-extrabold text-gray-900 mt-1">
                        {card.value}
                      </h3>

                      <p className="font-voces text-sm text-secondary mt-1">
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                  <div>
                    <h2 className="font-raleway text-xl font-bold text-gray-900">
                      Semester-wise Pass Percentage
                    </h2>

                    <p className="font-voces text-sm text-secondary mt-1">
                      Compare department pass rate from 1st to 8th semester
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setChartType("bar")}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                        chartType === "bar"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-secondary hover:bg-gray-200"
                      }`}
                    >
                      Bar
                    </button>

                    <button
                      onClick={() => setChartType("line")}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                        chartType === "line"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-secondary hover:bg-gray-200"
                      }`}
                    >
                      Line
                    </button>

                    <button
                      onClick={() => setChartType("pie")}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                        chartType === "pie"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-secondary hover:bg-gray-200"
                      }`}
                    >
                      Pie
                    </button>
                  </div>
                </div>

                <div className="h-[310px]">{renderPerformanceChart()}</div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-raleway text-xl font-bold text-gray-900">
                      Latest Semester Summary
                    </h2>

                    <p className="font-voces text-sm text-secondary mt-1">
                      Spring 2025 | Regular/Retake
                    </p>
                  </div>

                  <span className="rounded-full border border-primary px-3 py-1 text-xs font-bold text-primary">
                    Latest
                  </span>
                </div>

                <div className="mt-5 rounded-xl bg-blue-50 border border-blue-100 p-4">
                  <h3 className="font-raleway text-lg font-bold text-gray-900">
                    BCA Sixth Semester
                  </h3>

                  <p className="font-voces text-sm text-secondary mt-1">
                    Department result summary
                  </p>
                </div>

                <div className="mt-5 divide-y divide-gray-200">
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-secondary">
                      Total Students
                    </span>
                    <strong className="text-gray-900">45</strong>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-secondary">
                      Passed Students
                    </span>
                    <strong className="text-green-600">38</strong>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-secondary">
                      Failed Students
                    </span>
                    <strong className="text-red-600">7</strong>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-secondary">
                      Pass Percentage
                    </span>
                    <strong className="text-primary">84.4%</strong>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-secondary">Average GPA</span>
                    <strong className="text-gray-900">3.21</strong>
                  </div>
                </div>

                <button className="mt-5 w-full rounded-xl bg-primary py-3 text-white font-bold hover:bg-[#0069d9] transition">
                  View Full Semester Analysis
                </button>
              </div>
            </div>
            <div className="mt-6 w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h2 className="font-raleway text-xl font-bold text-gray-900">
                    Recent Activity
                  </h2>

                  <p className="font-voces text-sm text-secondary mt-1">
                    Latest system activities and result processing updates
                  </p>
                </div>

                <button className="text-sm font-bold text-primary hover:underline">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-50 border-y border-gray-200">
                      <th className="text-left px-4 py-3 text-sm font-bold text-secondary">
                        Activity
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-bold text-secondary">
                        Status
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-bold text-secondary">
                        Date
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-bold text-secondary">
                        Time
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentActivities.map((item) => {
                      const Icon = item.icon;

                      return (
                        <tr
                          key={item.activity}
                          className="border-b border-gray-100 hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                                <Icon size={19} />
                              </div>

                              <span className="text-sm font-semibold text-gray-800">
                                {item.activity}
                              </span>
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                                item.status === "Completed"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-blue-50 text-primary"
                              }`}
                            >
                              {item.status === "Completed" ? (
                                <CheckCircle size={14} />
                              ) : (
                                <Clock size={14} />
                              )}
                              {item.status}
                            </span>
                          </td>

                          <td className="px-4 py-4 text-sm text-secondary">
                            {item.date}
                          </td>

                          <td className="px-4 py-4 text-sm text-secondary">
                            {item.time}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
