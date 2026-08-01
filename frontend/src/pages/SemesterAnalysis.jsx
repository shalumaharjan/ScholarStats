import { useState } from "react";
import DashboardLayout from "../components/common/DashboardLayout";
import {
  Award,
  BarChart3,
  CheckCircle,
  FileSpreadsheet,
  GraduationCap,
  Percent,
  TrendingUp,
  XCircle,
  AlertTriangle,
} from "lucide-react";

import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function SemesterAnalysis() {
  const [selectedFileId, setSelectedFileId] = useState("");
  const [analysisGenerated, setAnalysisGenerated] = useState(false);

  const resultFiles = [
    {
      id: "1",
      fileName: "BCA_3rd_Fall_2025_JOB001.xlsx",
      program: "BCA",
      semester: "Third",
      academicYear: "2025",
      session: "Fall",
      students: 45,
    },
    {
      id: "2",
      fileName: "BCA_6th_Spring_2025_JOB002.xlsx",
      program: "BCA",
      semester: "Sixth",
      academicYear: "2025",
      session: "Spring",
      students: 42,
    },
  ];

  const analysisSummary = [
    {
      title: "Total Students",
      value: "45",
      description: "Students analyzed",
      icon: GraduationCap,
    },
    {
      title: "Passed Students",
      value: "38",
      description: "Passed all subjects",
      icon: CheckCircle,
    },
    {
      title: "Failed Students",
      value: "7",
      description: "One or more backlogs",
      icon: XCircle,
    },
    {
      title: "Pass Percentage",
      value: "84.4%",
      description: "Overall semester result",
      icon: Percent,
    },
    {
      title: "Average SGPA",
      value: "3.21",
      description: "Semester average",
      icon: TrendingUp,
    },
  ];

  const subjectPerformance = [
    {
      subject: "DSA",
      passed: 39,
      failed: 6,
      passRate: 86.7,
    },
    {
      subject: "OOP",
      passed: 40,
      failed: 5,
      passRate: 88.9,
    },
    {
      subject: "OS",
      passed: 36,
      failed: 9,
      passRate: 80,
    },
    {
      subject: "SAPM",
      passed: 41,
      failed: 4,
      passRate: 91.1,
    },
    {
      subject: "WT-I",
      passed: 38,
      failed: 7,
      passRate: 84.4,
    },
  ];

  const gradeDistribution = [
    { grade: "A", students: 8 },
    { grade: "A-", students: 10 },
    { grade: "B+", students: 9 },
    { grade: "B", students: 7 },
    { grade: "B-", students: 4 },
    { grade: "C+", students: 3 },
    { grade: "C", students: 2 },
    { grade: "F", students: 2 },
  ];

  const gradeColors = [
    "#007bff",
    "#28a745",
    "#20c997",
    "#6f42c1",
    "#ffc107",
    "#fd7e14",
    "#6c757d",
    "#dc3545",
  ];

  const topStudents = [
    {
      ern: "24530044",
      name: "Ram Sharma",
      sgpa: 3.92,
    },
    {
      ern: "24530090",
      name: "Sita Thapa",
      sgpa: 3.84,
    },
    {
      ern: "24530071",
      name: "Nisha Karki",
      sgpa: 3.84,
    },
    {
      ern: "24530055",
      name: "Hari Adhikari",
      sgpa: 3.68,
    },
    {
      ern: "24530058",
      name: "Hari Adhikari",
      sgpa: 3.63,
    },
  ];

  const backlogStudents = [
    {
      ern: "24530018",
      name: "Aayush Karki",
      failedSubjects: ["OS", "WT-I"],
    },
    {
      ern: "24530029",
      name: "Priya Rai",
      failedSubjects: ["DSA"],
    },
    {
      ern: "24530057",
      name: "Suman Thapa",
      failedSubjects: ["OOP", "OS", "SAPM"],
    },
    {
      ern: "24530081",
      name: "Roshani Sharma",
      failedSubjects: ["WT-I"],
    },
  ];

  const rankedStudents = [...topStudents]
    .sort((a, b) => b.sgpa - a.sgpa)
    .reduce((result, student, index) => {
      const previousStudent = result[index - 1];

      const rank =
        previousStudent && student.sgpa === previousStudent.sgpa
          ? previousStudent.rank
          : index + 1;

      result.push({
        ...student,
        rank,
      });

      return result;
    }, []);

  const displayedTopStudents = rankedStudents.filter(
    (student) => student.rank <= 5,
  );

  const handleGenerateAnalysis = () => {
    if (!selectedFileId) {
      alert("Please select a completed result file.");
      return;
    }

    setAnalysisGenerated(true);
  };

  return (
    <DashboardLayout
      title="Semester Analysis"
      subtitle="Analyze semester-wise academic performance"
    >
      <div className="mb-6">
        <h1 className="font-raleway text-3xl font-extrabold text-gray-900">
          Semester Analysis
        </h1>

        <p className="font-voces mt-1 text-secondary">
          View overall performance, grade distribution, subject results, and
          SGPA analysis for a selected semester.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-primary">
            <FileSpreadsheet size={24} />
          </div>

          <div>
            <h2 className="font-raleway text-xl font-bold text-gray-900">
              Select Result File
            </h2>

            <p className="font-voces mt-1 text-sm text-secondary">
              Select a completed result file to generate semester analysis.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Completed Result File
            </label>

            <select
              value={selectedFileId}
              onChange={(event) => {
                setSelectedFileId(event.target.value);
                setAnalysisGenerated(false);
              }}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Select a result file</option>

              {resultFiles.map((file) => (
                <option key={file.id} value={file.id}>
                  {file.fileName} — {file.semester} Semester, {file.session}{" "}
                  {file.academicYear} ({file.students} students)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerateAnalysis}
            disabled={!selectedFileId}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-[#0069d9] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <BarChart3 size={19} />
            Generate Analysis
          </button>
        </div>

        {analysisGenerated && (
          <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-bold text-green-700">
              Semester analysis generated successfully.
            </p>
          </div>
        )}
      </div>
      {analysisGenerated && (
        <div className="mt-6">
          <div className="mb-4">
            <h2 className="font-raleway text-2xl font-bold text-gray-900">
              Overall Semester Summary
            </h2>

            <p className="font-voces mt-1 text-sm text-secondary">
              Key academic performance indicators from the selected result file.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {analysisSummary.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary">
                    <Icon size={23} />
                  </div>

                  <p className="text-sm font-bold text-gray-700">
                    {card.title}
                  </p>

                  <h3 className="font-raleway mt-1 text-3xl font-extrabold text-gray-900">
                    {card.value}
                  </h3>

                  <p className="font-voces mt-1 text-sm text-secondary">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {analysisGenerated && (
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Subject-wise Performance */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="font-raleway text-xl font-bold text-gray-900">
                Subject-wise Performance
              </h2>

              <p className="font-voces mt-1 text-sm text-secondary">
                Pass percentage of students in each subject.
              </p>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectPerformance}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />

                  <XAxis dataKey="subject" />

                  <YAxis
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />

                  <Tooltip formatter={(value) => [`${value}%`, "Pass Rate"]} />

                  <Bar
                    dataKey="passRate"
                    fill="#007bff"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grade Distribution */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="font-raleway text-xl font-bold text-gray-900">
                Grade Distribution
              </h2>

              <p className="font-voces mt-1 text-sm text-secondary">
                Distribution of grades obtained by students.
              </p>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={gradeDistribution}
                    dataKey="students"
                    nameKey="grade"
                    cx="50%"
                    cy="47%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    label={({ grade, students }) => `${grade}: ${students}`}
                  >
                    {gradeDistribution.map((item, index) => (
                      <Cell
                        key={item.grade}
                        fill={gradeColors[index % gradeColors.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) => [`${value} students`, "Students"]}
                  />

                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {analysisGenerated && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="font-raleway text-xl font-bold text-gray-900">
              Subject-wise Result Details
            </h2>

            <p className="font-voces mt-1 text-sm text-secondary">
              Passed, failed, and pass percentage details for each subject.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-y border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                    Subject
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                    Passed
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                    Failed
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                    Total Students
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                    Pass Rate
                  </th>
                </tr>
              </thead>

              <tbody>
                {subjectPerformance.map((subject) => (
                  <tr
                    key={subject.subject}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 text-sm font-bold text-gray-800">
                      {subject.subject}
                    </td>

                    <td className="px-4 py-4 text-sm font-bold text-green-700">
                      {subject.passed}
                    </td>

                    <td className="px-4 py-4 text-sm font-bold text-red-600">
                      {subject.failed}
                    </td>

                    <td className="px-4 py-4 text-sm text-secondary">
                      {subject.passed + subject.failed}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${subject.passRate}%` }}
                          />
                        </div>

                        <span className="text-sm font-bold text-primary">
                          {subject.passRate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {analysisGenerated && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-700">
              <Award size={24} />
            </div>

            <div>
              <h2 className="font-raleway text-xl font-bold text-gray-900">
                Top Performing Students
              </h2>

              <p className="font-voces mt-1 text-sm text-secondary">
                Students with the highest SGPA in the selected semester.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-y border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                    Exam Roll No.
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                    Student Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                    SGPA
                  </th>
                </tr>
              </thead>

              <tbody>
                {displayedTopStudents.map((student) => (
                  <tr
                    key={student.ern}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          student.rank === 1
                            ? "bg-yellow-100 text-yellow-700"
                            : student.rank === 2
                              ? "bg-gray-200 text-gray-700"
                              : student.rank === 3
                                ? "bg-orange-100 text-orange-700"
                                : "bg-blue-50 text-primary"
                        }`}
                      >
                        {student.rank}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm font-bold text-gray-800">
                      {student.ern}
                    </td>

                    <td className="px-4 py-4 text-sm text-secondary">
                      {student.name}
                    </td>

                    <td className="px-4 py-4">
                      <span className="font-raleway text-lg font-extrabold text-primary">
                        {student.sgpa.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {analysisGenerated && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertTriangle size={24} />
            </div>

            <div>
              <h2 className="font-raleway text-xl font-bold text-gray-900">
                Backlog Analysis
              </h2>
              <p className="font-voces mt-1 text-sm text-secondary">
                Students having one or more failed subjects in the selected
                semester.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead>
                <tr className="border-y border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                    Exam Roll No.
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                    Student Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                    Failed Subjects
                  </th>
                </tr>
              </thead>

              <tbody>
                {backlogStudents.map((student) => (
                  <tr
                    key={student.ern}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 text-sm font-bold text-gray-800">
                      {student.ern}
                    </td>
                    <td className="px-4 py-4 text-sm text-secondary">
                      {student.name}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        {student.failedSubjects.map((subject) => (
                          <span
                            key={subject}
                            className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-600"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default SemesterAnalysis;
