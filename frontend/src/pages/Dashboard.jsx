import { useState } from "react";

import {
  BarChart3,
  BookOpen,
  CheckCircle,
  Clock,
  CloudDownload,
  FileText,
  GraduationCap,
  PieChart as PieChartIcon,
  UploadCloud,
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
  Legend,
} from "recharts";

function Dashboard() {
  const [chartType, setChartType] = useState("bar");

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

  const renderPerformanceChart = () => {
    const commonTooltipStyle = {
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
      fontSize: "13px",
    };

    if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={semesterPerformance}
            margin={{
              top: 15,
              right: 25,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              stroke="#e5e7eb"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="semester"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={(value) => value.replace(" Sem", "")}
              dy={10}
            />

            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              width={45}
            />

            <Tooltip
              contentStyle={commonTooltipStyle}
              labelStyle={{
                color: "#111827",
                fontWeight: 700,
                marginBottom: "4px",
              }}
              formatter={(value) => [`${value}%`, "Pass Rate"]}
              cursor={{
                stroke: "#9ca3af",
                strokeDasharray: "4 4",
              }}
            />

            <Line
              type="monotone"
              dataKey="passRate"
              stroke="#007bff"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#ffffff",
                stroke: "#007bff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#007bff",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              animationDuration={700}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "pie") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={semesterPerformance}
              dataKey="passRate"
              nameKey="semester"
              cx="50%"
              cy="46%"
              innerRadius="43%"
              outerRadius="68%"
              paddingAngle={3}
              stroke="#ffffff"
              strokeWidth={2}
              animationDuration={700}
            >
              {semesterPerformance.map((item, index) => (
                <Cell
                  key={item.semester}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={commonTooltipStyle}
              labelStyle={{
                color: "#111827",
                fontWeight: 700,
              }}
              formatter={(value) => [`${value}%`, "Pass Rate"]}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={9}
              formatter={(value) => (
                <span className="text-xs text-gray-600">{value}</span>
              )}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={semesterPerformance}
          margin={{
            top: 15,
            right: 25,
            left: 0,
            bottom: 10,
          }}
          barCategoryGap="28%"
        >
          <CartesianGrid
            stroke="#e5e7eb"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="semester"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickFormatter={(value) => value.replace(" Sem", "")}
            dy={10}
          />

          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
            width={45}
          />

          <Tooltip
            contentStyle={commonTooltipStyle}
            labelStyle={{
              color: "#111827",
              fontWeight: 700,
              marginBottom: "4px",
            }}
            formatter={(value) => [`${value}%`, "Pass Rate"]}
            cursor={{ fill: "#f3f4f6" }}
          />

          <Bar
            dataKey="passRate"
            fill="#007bff"
            radius={[6, 6, 0, 0]}
            maxBarSize={52}
            animationDuration={700}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <>
      {/* Department overview */}
      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-primary">
              <GraduationCap size={24} />
            </div>

            <div>
              <p className="font-voces text-xs text-secondary">Department</p>

              <h2 className="mt-1 font-raleway text-lg font-bold text-gray-900">
                Bachelor of Computer Application BCA
              </h2>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-secondary">
                <span>
                  Academic Year: <strong className="text-gray-900">2025</strong>
                </span>

                <span className="hidden text-gray-300 sm:inline">|</span>

                <span>
                  Total Semesters Tracked:{" "}
                  <strong className="text-gray-900">8</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <p className="font-voces text-xs text-secondary">Last Updated</p>

            <p className="mt-1 text-sm font-bold text-gray-800">
              1 July 2026, 10:30 AM
            </p>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-gray-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-gray-700">
                    {card.title}
                  </p>

                  <h3 className="mt-2 font-raleway text-3xl font-extrabold text-gray-900">
                    {card.value}
                  </h3>

                  <p className="mt-1 font-voces text-sm text-secondary">
                    {card.description}
                  </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-primary">
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Semester performance chart */}
      <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-raleway text-lg font-bold text-gray-900">
              Semester-wise Pass Percentage
            </h2>

            <p className="mt-1 font-voces text-sm text-secondary">
              Compare department pass rates from the 1st to 8th semester.
            </p>
          </div>

          <div className="inline-flex w-fit items-center rounded-lg border border-gray-200 bg-gray-50 p-1">
            <button
              type="button"
              onClick={() => setChartType("bar")}
              className={`rounded-md px-3.5 py-2 text-xs font-bold transition ${
                chartType === "bar"
                  ? "bg-primary text-white"
                  : "text-secondary hover:bg-white hover:text-gray-900"
              }`}
            >
              Bar
            </button>

            <button
              type="button"
              onClick={() => setChartType("line")}
              className={`rounded-md px-3.5 py-2 text-xs font-bold transition ${
                chartType === "line"
                  ? "bg-primary text-white"
                  : "text-secondary hover:bg-white hover:text-gray-900"
              }`}
            >
              Line
            </button>

            <button
              type="button"
              onClick={() => setChartType("pie")}
              className={`rounded-md px-3.5 py-2 text-xs font-bold transition ${
                chartType === "pie"
                  ? "bg-primary text-white"
                  : "text-secondary hover:bg-white hover:text-gray-900"
              }`}
            >
              Pie
            </button>
          </div>
        </div>

        <div className="h-[340px] px-2 py-4 sm:h-[390px] sm:px-5">
          {renderPerformanceChart()}
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-5 rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="font-raleway text-lg font-bold text-gray-900">
              Recent Activity
            </h2>

            <p className="mt-1 font-voces text-sm text-secondary">
              Latest system activities and result processing updates
            </p>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-md border border-gray-200 px-3 py-2 text-xs font-bold text-primary transition hover:border-primary hover:bg-blue-50"
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Activity
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
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
                    className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-primary">
                          <Icon size={17} />
                        </div>

                        <span className="text-sm font-semibold text-gray-800">
                          {item.activity}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${
                          item.status === "Completed"
                            ? "border-green-200 bg-green-50 text-green-700"
                            : "border-blue-200 bg-blue-50 text-primary"
                        }`}
                      >
                        {item.status === "Completed" ? (
                          <CheckCircle size={13} />
                        ) : (
                          <Clock size={13} />
                        )}

                        {item.status}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-sm text-secondary">
                      {item.date}
                    </td>

                    <td className="px-5 py-3.5 text-sm text-secondary">
                      {item.time}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
