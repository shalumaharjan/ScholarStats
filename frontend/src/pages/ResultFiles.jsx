import { useState } from "react";
import DashboardLayout from "../components/common/DashboardLayout";

import {
  BarChart3,
  CheckCircle,
  Download,
  Eye,
  FileSpreadsheet,
  Loader2,
  Search,
  Trash2,
  Users,
} from "lucide-react";

function ResultFiles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const summaryCards = [
    {
      title: "Total Result Files",
      value: "8",
      description: "Generated Excel files",
      icon: FileSpreadsheet,
    },
    {
      title: "Completed",
      value: "6",
      description: "Ready for download",
      icon: CheckCircle,
    },
    {
      title: "Processing",
      value: "2",
      description: "Fetch jobs running",
      icon: Loader2,
    },
    {
      title: "Total Result Records",
      value: "286",
      description: "Fetched student results",
      icon: Users,
    },
  ];

  const resultFiles = [
    {
      id: 1,
      fileName: "BCA_3rd_Fall_2025_JOB001.xlsx",
      program: "BCA",
      semester: "Third",
      academicYear: "2025",
      session: "Fall",
      students: 45,
      status: "Completed",
      generatedDate: "1 August 2026",
    },
    {
      id: 2,
      fileName: "BCA_6th_Spring_2025_JOB002.xlsx",
      program: "BCA",
      semester: "Sixth",
      academicYear: "2025",
      session: "Spring",
      students: 42,
      status: "Completed",
      generatedDate: "28 July 2026",
    },
    {
      id: 3,
      fileName: "BCA_5th_Fall_2024_JOB003.xlsx",
      program: "BCA",
      semester: "Fifth",
      academicYear: "2024",
      session: "Fall",
      students: 40,
      status: "Processing",
      generatedDate: "-",
    },
    {
      id: 4,
      fileName: "BCA_4th_Spring_2024_JOB004.xlsx",
      program: "BCA",
      semester: "Fourth",
      academicYear: "2024",
      session: "Spring",
      students: 38,
      status: "Failed",
      generatedDate: "-",
    },
  ];

  const filteredResultFiles = resultFiles.filter((file) => {
    const matchesSearch =
      file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.semester.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || file.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    if (status === "Completed") {
      return "border-green-200 bg-green-50 text-green-700";
    }

    if (status === "Processing") {
      return "border-blue-200 bg-blue-50 text-primary";
    }

    if (status === "Failed") {
      return "border-red-200 bg-red-50 text-red-700";
    }

    return "border-gray-200 bg-gray-50 text-gray-700";
  };

  return (
    <DashboardLayout
      title="Result Files"
      subtitle="Manage generated student result files"
    >
      <div className="mb-6">
        <h1 className="font-raleway text-3xl font-extrabold text-gray-900">
          Result Files
        </h1>

        <p className="font-voces mt-1 text-secondary">
          View, download, and analyze Excel files generated after result
          fetching.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-primary">
                <Icon
                  size={26}
                  className={card.title === "Processing" ? "animate-spin" : ""}
                />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-700">{card.title}</p>

                <h3 className="font-raleway mt-1 text-3xl font-extrabold text-gray-900">
                  {card.value}
                </h3>

                <p className="font-voces mt-1 text-sm text-secondary">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-raleway text-xl font-bold text-gray-900">
              Generated Result Files
            </h2>

            <p className="font-voces mt-1 text-sm text-secondary">
              Excel files generated after fetching student grades and SGPA.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search result files..."
                className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-blue-100 sm:w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-blue-100"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-y border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  File Name
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Program
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Semester
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Year
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Session
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Students
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Generated Date
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredResultFiles.length > 0 ? (
                filteredResultFiles.map((file) => (
                  <tr
                    key={file.id}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-primary">
                          <FileSpreadsheet size={18} />
                        </div>

                        <span className="text-sm font-bold text-gray-800">
                          {file.fileName}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm text-secondary">
                      {file.program}
                    </td>

                    <td className="px-4 py-4 text-sm text-secondary">
                      {file.semester}
                    </td>

                    <td className="px-4 py-4 text-sm text-secondary">
                      {file.academicYear}
                    </td>

                    <td className="px-4 py-4 text-sm text-secondary">
                      {file.session}
                    </td>

                    <td className="px-4 py-4 text-sm font-bold text-gray-800">
                      {file.students}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusBadge(
                          file.status,
                        )}`}
                      >
                        {file.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-secondary">
                      {file.generatedDate}
                    </td>

                    <td className="px-4 py-4">
                      {file.status === "Completed" ? (
                        <div className="flex items-center gap-2">
                          <button
                            title="View result file"
                            className="rounded-lg bg-blue-50 p-2 text-primary transition hover:bg-blue-100"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            title="Download Excel"
                            className="rounded-lg bg-green-50 p-2 text-green-700 transition hover:bg-green-100"
                          >
                            <Download size={16} />
                          </button>

                          <button
                            title="Analyze results"
                            className="rounded-lg bg-purple-50 p-2 text-purple-700 transition hover:bg-purple-100"
                          >
                            <BarChart3 size={16} />
                          </button>

                          <button
                            title="Delete file"
                            className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ) : file.status === "Processing" ? (
                        <button
                          disabled
                          className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-primary"
                        >
                          <Loader2 size={14} className="animate-spin" />
                          Processing
                        </button>
                      ) : (
                        <button className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100">
                          View Error
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-4 py-12 text-center">
                    <FileSpreadsheet
                      size={42}
                      className="mx-auto mb-3 text-gray-300"
                    />

                    <h3 className="font-raleway text-lg font-bold text-gray-700">
                      No result files found
                    </h3>

                    <p className="font-voces mt-1 text-sm text-secondary">
                      Try changing the search text or status filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ResultFiles;
