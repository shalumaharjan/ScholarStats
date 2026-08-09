import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import {
  Award,
  BarChart3,
  CheckCircle,
  FileSpreadsheet,
  Percent,
  TrendingUp,
  XCircle,
  AlertTriangle,
  Users,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SemesterAnalysis() {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [resultFiles, setResultFiles] = useState([]);

  const [searchParams] = useSearchParams();

  const fileId = searchParams.get("fileId");

  const [selectedFileId, setSelectedFileId] = useState("");
  const [analysisGenerated, setAnalysisGenerated] = useState(false);

  const [topStudents, setTopStudents] = useState([]);
  const [backlogStudents, setBacklogStudents] = useState([]);

  const analysisSummary = analysisData
    ? [
        {
          title: "Total Students",
          value: analysisData.summary.total_students,
          description: "Students analyzed",
          icon: Users,
        },
        {
          title: "Passed Students",
          value: analysisData.summary.passed_students,
          description: "Successfully passed",
          icon: CheckCircle,
        },
        {
          title: "Failed Students",
          value: analysisData.summary.failed_students,
          description: "Students with backlogs",
          icon: XCircle,
        },
        {
          title: "Pass Percentage",
          value: `${analysisData.summary.pass_percentage}%`,
          description: "Overall semester result",
          icon: Percent,
        },
        {
          title: "Average SGPA",
          value: analysisData.summary.average_sgpa,
          description: "Semester average SGPA",
          icon: TrendingUp,
        },
      ]
    : [];

  const fetchResultFiles = async () => {
    try {
      const response = await axiosInstance.get("/api/result-files");

      setResultFiles(response.data);
    } catch (error) {
      console.error("Result files error:", error);
    }
  };

  const fetchAnalysis = async (id = selectedFileId) => {
    try {
      const response = await axiosInstance.get(
        `/api/analysis/result-files/${id}`,
      );
      setAnalysisData(response.data);
      return true;
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysisData(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResultFiles();
    if (fileId) {
      setSelectedFileId(fileId);
      fetchAnalysis(fileId);
    } else {
      setLoading(false);
    }
  }, [fileId]);

  const getSubjectShortName = (subject) => {
    if (!subject) return "";

    const words = subject.trim().split(/\s+/);

    // Already a short subject code like DSA, WT, OS
    if (words.length === 1 && subject.length <= 6) {
      return subject.toUpperCase();
    }

    // Create abbreviation from first letters
    return words
      .filter(
        (word) =>
          !["and", "of", "the", "for", "in", "to"].includes(word.toLowerCase()),
      )
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const subjectPerformance = analysisData
    ? Object.entries(analysisData.summary.subject_performance || {}).map(
        ([subject, data]) => ({
          fullSubject: subject,
          shortSubject: getSubjectShortName(subject),
          passPercentage: data.pass_percentage,
        }),
      )
    : [];

  const fetchTopStudents = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/analysis/result-files/${selectedFileId}/top-students`,
      );

      setTopStudents(response.data.top_students);
    } catch (error) {
      console.error(error);
    }
  };

  const subjectGradeDistribution =
    analysisData?.summary?.subject_grade_distribution || {};

  // const gradeColors = [
  //   "#007bff",
  //   "#28a745",
  //   "#20c997",
  //   "#6f42c1",
  //   "#ffc107",
  //   "#fd7e14",
  //   "#6c757d",
  //   "#dc3545",
  // ];

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

  const handleGenerateAnalysis = async () => {
    if (!selectedFileId) {
      alert("Please select a completed result file.");
      return;
    }
    const success = await fetchAnalysis(selectedFileId);
    if (!success) {
      setAnalysisGenerated(false);
      alert("Unable to generate analysis for this result file.");
      return;
    }
    await fetchTopStudents();
    await fetchBacklogs();
    setAnalysisGenerated(true);
  };

  const fetchBacklogs = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/analysis/result-files/${selectedFileId}/backlogs`,
      );

      setBacklogStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-5 text-center">Loading analysis...</div>;
  }

  return (
    <>
      {/* Result file selection */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-start gap-3 border-b border-gray-200 px-5 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-primary">
            <FileSpreadsheet size={20} />
          </div>

          <div>
            <h2 className="font-raleway text-lg font-bold text-gray-900">
              Select Result File
            </h2>

            <p className="mt-1 font-voces text-sm text-secondary">
              Select a completed result file to generate semester analysis.
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="flex-1">
              <label
                htmlFor="resultFile"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Completed Result File
              </label>

              <select
                id="resultFile"
                value={selectedFileId}
                onChange={(event) => {
                  setSelectedFileId(event.target.value);
                  setAnalysisGenerated(false);
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
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
              type="button"
              onClick={handleGenerateAnalysis}
              disabled={!selectedFileId}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0069d9] focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto"
            >
              <BarChart3 size={18} />
              Generate Analysis
            </button>
          </div>

          {analysisGenerated && (
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
              <CheckCircle size={17} className="shrink-0 text-green-700" />

              <p className="text-sm font-bold text-green-700">
                Semester analysis generated successfully.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Overall summary */}
      {analysisGenerated && (
        <div className="mt-5">
          <div className="mb-4">
            <h2 className="font-raleway text-xl font-bold text-gray-900">
              Overall Semester Summary
            </h2>

            <p className="mt-1 font-voces text-sm text-secondary">
              Key academic performance indicators from the selected result file.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {analysisSummary.map((card) => {
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
        </div>
      )}

      {analysisGenerated && (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.2fr_1fr]">
          <div className="mt-5">
            {/* Performance charts */}
            {/* Subject-wise performance */}
            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="font-raleway text-lg font-bold text-gray-900">
                  Subject-wise Performance
                </h2>

                <p className="mt-1 font-voces text-sm text-secondary">
                  Pass percentage of students in each subject.
                </p>
              </div>

              <div className="h-[380px] p-5">
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
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="shortSubject" />
                    <YAxis
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload;

                          return (
                            <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-md">
                              <p className="font-raleway text-sm font-bold text-gray-800">
                                {item.fullSubject}
                              </p>

                              <p className="mt-1 font-voces text-sm text-primary">
                                Pass %: {item.passPercentage}%
                              </p>
                            </div>
                          );
                        }

                        return null;
                      }}
                    />

                    <Bar
                      dataKey="passPercentage"
                      fill="#007bff"
                      radius={[5, 5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Subject-wise details */}
          <div className="mt-5 rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="font-raleway text-lg font-bold text-gray-900">
                Subject-wise Result Details
              </h2>

              <p className="mt-1 font-voces text-sm text-secondary">
                Passed, failed, and pass percentage details for each subject.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                      Subject
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide text-secondary">
                      Passed
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wide text-secondary">
                      Failed
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Object.entries(analysisData.summary.subject_performance).map(
                    ([subject, data]) => (
                      <tr
                        key={subject}
                        className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-gray-50"
                      >
                        <td className="px-5 py-3.5 text-sm font-bold text-gray-800">
                          {subject}
                        </td>

                        <td className="px-5 py-3.5 text-center text-sm font-bold text-green-700">
                          {data.pass}
                        </td>

                        <td className="px-5 py-3.5 text-center text-sm font-bold text-red-600">
                          {data.fail}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {analysisGenerated && analysisData && (
        <div className="mt-5 rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="font-raleway text-lg font-bold text-gray-900">
              Subject-wise Grade Distribution
            </h2>

            <p className="mt-1 font-voces text-sm text-secondary">
              Distribution of grades obtained by students in each subject.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1300px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase text-secondary">
                    Subject
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase text-secondary">
                    A
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase text-secondary">
                    A-
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase text-secondary">
                    B+
                  </th>

                  <th className="px-5 py-3 text-center text-xs font-bold uppercase text-secondary">
                    B
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase text-secondary">
                    B-
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase text-secondary">
                    C+
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase text-secondary">
                    C
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase text-secondary">
                    C-
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase text-secondary">
                    D+
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase text-secondary">
                    D
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase text-secondary">
                    F
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold uppercase text-secondary">
                    ABS
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  analysisData?.summary?.subject_grade_distribution || {},
                ).map(([subject, grades]) => (
                  <tr
                    key={subject}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-5 py-3.5 text-sm font-bold text-gray-800">
                      {subject}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {grades["A"] || 0}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {grades["A-"] || 0}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {grades["B+"] || 0}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {grades["B"] || 0}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {grades["B-"] || 0}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {grades["C"] || 0}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {grades["C+"] || 0}
                    </td>

                    <td className="px-5 py-3.5 text-center">
                      {grades["C"] || 0}
                    </td>

                    <td className="px-5 py-3.5 text-center">
                      {grades["C-"] || 0}
                    </td>

                    <td className="px-5 py-3.5 text-center">
                      {grades["D+"] || 0}
                    </td>
                    <td className="px-5 py-3.5 text-center font-bold text-red-600">
                      {grades["F"] || 0}
                    </td>
                    <td className="px-5 py-3.5 text-center font-bold text-orange-600">
                      {grades["ABS"] || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top students */}
      {analysisGenerated && (
        <div className="mt-5 rounded-xl border border-gray-200 bg-white">
          <div className="flex items-start gap-3 border-b border-gray-200 px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-700">
              <Award size={20} />
            </div>

            <div>
              <h2 className="font-raleway text-lg font-bold text-gray-900">
                Top Performing Students
              </h2>

              <p className="mt-1 font-voces text-sm text-secondary">
                Students with the highest SGPA in the selected semester.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                    Rank
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                    Exam Roll No.
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                    Student Name
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                    SGPA
                  </th>
                </tr>
              </thead>

              <tbody>
                {displayedTopStudents.map((student) => (
                  <tr
                    key={student.student_id}
                    className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm font-bold ${
                          student.rank === 1
                            ? "border border-yellow-200 bg-yellow-50 text-yellow-700"
                            : student.rank === 2
                              ? "border border-gray-300 bg-gray-100 text-gray-700"
                              : student.rank === 3
                                ? "border border-orange-200 bg-orange-50 text-orange-700"
                                : "border border-blue-200 bg-blue-50 text-primary"
                        }`}
                      >
                        {student.rank}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-sm font-bold text-gray-800">
                      {student.student_id}
                    </td>

                    <td className="px-5 py-3.5 text-sm text-secondary">
                      {student.name}
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="font-raleway text-base font-extrabold text-primary">
                        {Number(student.sgpa).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Backlog analysis */}
      {analysisGenerated && (
        <div className="mt-5 rounded-xl border border-gray-200 bg-white">
          <div className="flex items-start gap-3 border-b border-gray-200 px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600">
              <AlertTriangle size={20} />
            </div>

            <div>
              <h2 className="font-raleway text-lg font-bold text-gray-900">
                Backlog Analysis
              </h2>

              <p className="mt-1 font-voces text-sm text-secondary">
                Students having one or more failed subjects in the selected
                semester.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                    Exam Roll No.
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                    Student Name
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                    Failed Subjects
                  </th>
                </tr>
              </thead>

              <tbody>
                {backlogStudents.map((student) => (
                  <tr
                    key={student.student_id}
                    className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-3.5 text-sm font-bold text-gray-800">
                      {student.student_id}
                    </td>

                    <td className="px-5 py-3.5 text-sm text-secondary">
                      {student.name}
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-2">
                        {student.subjects.map((subject) => (
                          <span
                            key={subject}
                            title={subject}
                            className="rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600"
                          >
                            {getSubjectShortName(subject)}
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
    </>
  );
}

export default SemesterAnalysis;
