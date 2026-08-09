import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
import ConfirmDeleteModal from "../components/common/ConfirmDeleteModal";

function ResultFiles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [resultFiles, setResultFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchResultFiles = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/result-files");
      setResultFiles(response.data);
    } catch (error) {
      console.error("Result files error:", error);
      toast.error("Failed to fetch result files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResultFiles();
  }, []);

  const summaryCards = [
    {
      title: "Total Result Files",
      value: resultFiles.length,
      description: "Generated Excel files",
      icon: FileSpreadsheet,
    },
    {
      title: "Completed",
      value: resultFiles.filter((file) => file.status === "Completed").length,
      description: "Ready for download",
      icon: CheckCircle,
    },
    {
      title: "Processing",
      value: resultFiles.filter((file) => file.status === "Processing").length,
      description: "Fetch jobs running",
      icon: Loader2,
    },
    {
      title: "Total Result Records",
      value: resultFiles.reduce((total, file) => total + file.students, 0),
      description: "Fetched student results",
      icon: Users,
    },
  ];

  const filteredResultFiles = resultFiles.filter((file) => {
    const matchesSearch =
      file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(file.semester).toLowerCase().includes(searchTerm.toLowerCase());

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

  const handleDeleteFile = async () => {
    try {
      setIsDeleting(true);
      await axiosInstance.delete(`/api/result-files/${deleteTarget.id}`);
      toast.success("Result file deleted successfully");
      setDeleteTarget(null);
      fetchResultFiles();
    } catch (error) {
      toast.error("Failed to delete result file");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Summary cards */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                  <Icon
                    size={20}
                    className={
                      card.title === "Processing" ? "animate-spin" : ""
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generated result files */}
      <div className="rounded-xl border border-gray-200 bg-white">
        {/* Section heading and filters */}
        <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-raleway text-lg font-bold text-gray-900">
              Generated Result Files
            </h2>

            <p className="mt-1 font-voces text-sm text-secondary">
              Excel files generated after fetching student grades and SGPA.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search result files..."
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-blue-100 sm:w-64"
              />
            </div>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter result files by status"
              className="rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  File Name
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Program
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Semester
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Year
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Session
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Students
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Generated Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredResultFiles.length > 0 ? (
                filteredResultFiles.map((file) => (
                  <tr
                    key={file.id}
                    className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-gray-50"
                  >
                    {/* File name */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-primary">
                          <FileSpreadsheet size={17} />
                        </div>

                        <span className="max-w-[260px] break-all text-sm font-bold text-gray-800">
                          {file.fileName}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-sm text-secondary">
                      {file.program}
                    </td>

                    <td className="px-5 py-3.5 text-sm text-secondary">
                      {file.semester}
                    </td>

                    <td className="px-5 py-3.5 text-sm text-secondary">
                      {file.academicYear}
                    </td>

                    <td className="px-5 py-3.5 text-sm text-secondary">
                      {file.session}
                    </td>

                    <td className="px-5 py-3.5 text-sm font-bold text-gray-800">
                      {file.students}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${getStatusBadge(
                          file.status,
                        )}`}
                      >
                        {file.status}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-sm text-secondary">
                      {new Date(file.generatedDate).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      {file.status === "Completed" ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            title="View result file"
                            onClick={() => navigate(`/result-files/${file.id}`)}
                            aria-label={`View ${file.fileName}`}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 transition hover:border-primary hover:bg-blue-50 hover:text-primary"
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            type="button"
                            title="Download Excel"
                            onClick={() =>
                              window.open(
                                `${import.meta.env.VITE_FASTAPI_API_BASE_URL}/api/result-files/${file.id}/download`,
                                "_blank",
                              )
                            }
                            aria-label={`Download ${file.fileName}`}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-green-200 text-green-700 transition hover:bg-green-50"
                          >
                            <Download size={14} />
                          </button>

                          <button
                            type="button"
                            title="Analyze results"
                            onClick={() =>
                              navigate(`/semester-analysis?fileId=${file.id}`)
                            }
                            aria-label={`Analyze ${file.fileName}`}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-purple-200 text-purple-700 transition hover:bg-purple-50"
                          >
                            <BarChart3 size={14} />
                          </button>

                          <button
                            type="button"
                            title="Delete file"
                            onClick={() => setDeleteTarget(file)}
                            aria-label={`Delete ${file.fileName}`}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-red-200 text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : file.status === "Processing" ? (
                        <button
                          type="button"
                          disabled
                          className="flex cursor-not-allowed items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-primary"
                        >
                          <Loader2 size={14} className="animate-spin" />
                          Processing
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
                        >
                          View Error
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-5 py-14 text-center">
                    <FileSpreadsheet
                      size={34}
                      className="mx-auto mb-3 text-gray-300"
                    />

                    <h3 className="font-raleway text-sm font-bold text-gray-700">
                      No result files found
                    </h3>

                    <p className="mt-1 font-voces text-sm text-secondary">
                      Try changing the search text or status filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={deleteTarget !== null}
        title="Delete Result File?"
        message="Are you sure you want to delete"
        itemName={deleteTarget?.fileName}
        isDeleting={isDeleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteFile}
      />
    </>
  );
}

export default ResultFiles;
