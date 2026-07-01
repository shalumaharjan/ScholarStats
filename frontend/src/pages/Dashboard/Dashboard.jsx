import { useState } from "react";
import {
  Users,
  GraduationCap,
  FileText,
  CloudDownload,
  TrendingUp,
  Star,
  AlertTriangle,
  Clock,
  CheckCircle,
  UploadCloud,
  PieChart as PieChartIcon,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./Dashboard.css";

function Dashboard() {
  const [chartType, setChartType] = useState("bar");

  const summaryCards = [
    {
      title: "Total Students",
      value: "320",
      description: "Across all semesters",
      icon: Users,
      color: "blue",
    },
    {
      title: "Semesters Tracked",
      value: "8",
      description: "1st to 8th Semester",
      icon: GraduationCap,
      color: "green",
    },
    {
      title: "Result Files",
      value: "12",
      description: "Uploaded files",
      icon: FileText,
      color: "orange",
    },
    {
      title: "Fetch Jobs",
      value: "6",
      description: "Total fetch operations",
      icon: CloudDownload,
      color: "sky",
    },
    {
      title: "Average Pass Rate",
      value: "82.5%",
      description: "Department average",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: "Overall Avg GPA",
      value: "3.14",
      description: "On 4.00 scale",
      icon: Star,
      color: "purple",
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

  const chartColors = ["#2563eb", "#16a34a", "#f97316", "#7c3aed", "#ef4444"];

  const renderPerformanceChart = () => {
    if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={semesterPerformance}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="semester" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="passRate"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "pie") {
      return (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
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
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={semesterPerformance}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="semester" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="passRate" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const subjectsNeedingAttention = [
    {
      subject: "Database Management System",
      failed: 9,
      status: "High",
    },
    {
      subject: "Data Structures and Algorithms",
      failed: 7,
      status: "High",
    },
    {
      subject: "Operating Systems",
      failed: 5,
      status: "Medium",
    },
    {
      subject: "Computer Networks",
      failed: 4,
      status: "Medium",
    },
  ];

  const recentActivities = [
    {
      activity: "BCA Sixth Semester file uploaded",
      status: "Completed",
      date: "1 July 2026",
    },
    {
      activity: "Spring 2025 result fetch started",
      status: "Processing",
      date: "1 July 2026",
    },
    {
      activity: "Semester analysis generated",
      status: "Completed",
      date: "1 July 2026",
    },
    {
      activity: "PDF report exported",
      status: "Completed",
      date: "30 June 2026",
    },
  ];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>ScholarStats</h2>
        <p>Academic Result Analyzer</p>

        <nav>
          <button className="active">Dashboard</button>
          <button>Student Files</button>
          <button>Fetch Result</button>
          <button>Fetch Status</button>
          <button>Upload Report</button>
          <button>Semester Analysis</button>
          <button>Reports</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h3>Dashboard</h3>
          <div className="admin-box">Admin</div>
        </header>

        <section className="dashboard-page">
          <h1>Dashboard</h1>
          <p>Department-wide academic result overview</p>

          <div className="department-card">
            <h3>Department: Bachelor of Computer Application BCA</h3>
            <p>Academic Year: 2025 | Total Semesters Tracked: 8</p>
          </div>

          <div className="summary-grid">
            {summaryCards.map((card) => {
              const Icon = card.icon;

              return (
                <div className="summary-card" key={card.title}>
                  <div className={`summary-icon ${card.color}`}>
                    <Icon size={26} />
                  </div>

                  <div className="summary-info">
                    <p>{card.title}</p>
                    <h2>{card.value}</h2>
                    <span>{card.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="performance-section">
            <div className="performance-card">
              <div className="section-heading">
                <h3>Semester-wise Pass Percentage</h3>
                <p>Overall pass rate trend of BCA department</p>
              </div>

              <div className="chart-type-buttons">
                <button
                  className={chartType === "bar" ? "active" : ""}
                  onClick={() => setChartType("bar")}
                >
                  Bar
                </button>

                <button
                  className={chartType === "line" ? "active" : ""}
                  onClick={() => setChartType("line")}
                >
                  Line
                </button>

                <button
                  className={chartType === "pie" ? "active" : ""}
                  onClick={() => setChartType("pie")}
                >
                  Pie
                </button>
              </div>

              <div className="performance-chart-box">
                {renderPerformanceChart()}
              </div>
            </div>

            <div className="latest-semester-card">
              <div className="section-heading">
                <h3>Latest Semester Summary</h3>
                <p>Spring 2025 | Regular/Retake</p>
              </div>

              <div className="latest-title-box">
                <h2>BCA Sixth Semester</h2>
                <span>Latest Result</span>
              </div>

              <div className="latest-stats">
                <div>
                  <p>Total Students</p>
                  <strong>45</strong>
                </div>

                <div>
                  <p>Passed Students</p>
                  <strong>38</strong>
                </div>

                <div>
                  <p>Failed Students</p>
                  <strong>7</strong>
                </div>

                <div>
                  <p>Pass Percentage</p>
                  <strong className="green-text">84.4%</strong>
                </div>

                <div>
                  <p>Average GPA</p>
                  <strong>3.21</strong>
                </div>
              </div>

              <button className="view-analysis-button">
                View Full Semester Analysis
              </button>
            </div>
          </div>
          <div className="bottom-section">
            <div className="attention-card">
              <div className="section-heading-row">
                <div>
                  <h3>Subjects Needing Attention</h3>
                  <p>Subjects with higher failure count</p>
                </div>

                <AlertTriangle size={24} />
              </div>

              <div className="subject-list">
                {subjectsNeedingAttention.map((item) => (
                  <div className="subject-item" key={item.subject}>
                    <div>
                      <h4>{item.subject}</h4>
                      <p>{item.failed} students failed</p>
                    </div>

                    <span
                      className={
                        item.status === "High"
                          ? "risk-badge high"
                          : "risk-badge medium"
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <button className="outline-action-button">
                View Subject Analysis
              </button>
            </div>

            <div className="activity-card">
              <div className="section-heading-row">
                <div>
                  <h3>Recent Activity</h3>
                  <p>Latest system activities</p>
                </div>

                <Clock size={24} />
              </div>

              <div className="activity-list">
                {recentActivities.map((item) => (
                  <div className="activity-item" key={item.activity}>
                    <div className="activity-icon">
                      {item.status === "Completed" ? (
                        <CheckCircle size={18} />
                      ) : (
                        <Clock size={18} />
                      )}
                    </div>

                    <div className="activity-details">
                      <h4>{item.activity}</h4>
                      <p>{item.date}</p>
                    </div>

                    <span
                      className={
                        item.status === "Completed"
                          ? "activity-status completed"
                          : "activity-status processing"
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
