import { useState } from "react";
import {
  Download,
  Eye,
  FileDown,
  FileSpreadsheet,
  FileText,
  Loader2,
  Search,
  Trash2,
} from "lucide-react";

function Reports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [formatFilter, setFormatFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState({
    resultFileId: "",
    reportType: "Complete Academic Report",
    reportFormat: "PDF",
  });

  const resultFiles = [
    {
      id: "1",
      fileName: "BCA_3rd_Fall_2025_JOB001.xlsx",
      semester: "Third",
      year: "2025",
      session: "Fall",
    },
    {
      id: "2",
      fileName: "BCA_6th_Spring_2025_JOB002.xlsx",
      semester: "Sixth",
      year: "2025",
      session: "Spring",
    },
  ];

  const [generatedReports, setGeneratedReports] = useState([
    {
      id: 1,
      reportName: "BCA_6th_Semester_Complete_Report.pdf",
      reportType: "Complete Academic Report",
      format: "PDF",
      semester: "Sixth",
      generatedDate: "2026-08-01",
      status: "Completed",
    },
    {
      id: 2,
      reportName: "BCA_3rd_Subject_Performance.xlsx",
      reportType: "Subject-wise Performance Report",
      format: "Excel",
      semester: "Third",
      generatedDate: "2026-07-30",
      status: "Completed",
    },
    {
      id: 3,
      reportName: "BCA_6th_Backlog_Report.pdf",
      reportType: "Backlog Report",
      format: "PDF",
      semester: "Sixth",
      generatedDate: "2026-08-01",
      status: "Processing",
    },
  ]);
  const filteredReports = generatedReports.filter((report) => {
    const searchValue = searchTerm.toLowerCase();

    const matchesSearch =
      report.reportName.toLowerCase().includes(searchValue) ||
      report.reportType.toLowerCase().includes(searchValue) ||
      report.semester.toLowerCase().includes(searchValue);

    const matchesFormat =
      formatFilter === "All" || report.format === formatFilter;

    const matchesStatus =
      statusFilter === "All" || report.status === statusFilter;

    return matchesSearch && matchesFormat && matchesStatus;
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const semesterFileNames = {
    First: "1st",
    Second: "2nd",
    Third: "3rd",
    Fourth: "4th",
    Fifth: "5th",
    Sixth: "6th",
    Seventh: "7th",
    Eighth: "8th",
  };

  const reportFileNames = {
    "Complete Academic Report": "Complete_Report",
    "Semester Summary Report": "Semester_Summary",
    "Subject-wise Performance Report": "Subject_Performance",
    "Backlog Report": "Backlog_Report",
    "Top Students Report": "Top_Students",
  };

  const handleGenerateReport = () => {
    if (!formData.resultFileId) {
      alert("Please select a completed result file.");
      return;
    }

    const selectedFile = resultFiles.find(
      (file) => file.id === formData.resultFileId,
    );

    if (!selectedFile) {
      alert("Selected result file was not found.");
      return;
    }

    setIsGenerating(true);

    const reportId = Date.now();
    const extension = formData.reportFormat === "PDF" ? "pdf" : "xlsx";
    const semesterName =
      semesterFileNames[selectedFile.semester] || selectedFile.semester;

    const reportName =
      reportFileNames[formData.reportType] || "Academic_Report";

    const newReport = {
      id: reportId,
      reportName: `BCA_${semesterName}_${reportName}.${extension}`,
      reportType: formData.reportType,
      format: formData.reportFormat,
      semester: selectedFile.semester,
      generatedDate: new Date().toISOString().split("T")[0],
      status: "Processing",
    };

    setGeneratedReports((previousReports) => [newReport, ...previousReports]);

    setTimeout(() => {
      setGeneratedReports((previousReports) =>
        previousReports.map((report) =>
          report.id === reportId
            ? {
                ...report,
                status: "Completed",
              }
            : report,
        ),
      );

      setIsGenerating(false);
    }, 2000);
  };

  const handleDeleteReport = (reportId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this generated report?",
    );

    if (!confirmed) {
      return;
    }

    setGeneratedReports((previousReports) =>
      previousReports.filter((report) => report.id !== reportId),
    );
  };

  return (
    <>
      {/* Generate report */}
      <div className="rounded-xl border border-gray-200 bg-white">
        {/* Section heading */}
        <div className="flex items-start gap-3 border-b border-gray-200 px-5 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-primary">
            <FileText size={20} />
          </div>

          <div>
            <h2 className="font-raleway text-lg font-bold text-gray-900">
              Generate Report
            </h2>

            <p className="mt-1 font-voces text-sm text-secondary">
              Select a completed result file, report type, and download format.
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Result File */}
            <div>
              <label
                htmlFor="resultFileId"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Result File
              </label>

              <select
                id="resultFileId"
                name="resultFileId"
                value={formData.resultFileId}
                onChange={handleInputChange}
                disabled={isGenerating}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                <option value="">Select a completed result file</option>

                {resultFiles.map((file) => (
                  <option key={file.id} value={file.id}>
                    {file.fileName} — {file.semester} Semester, {file.session}{" "}
                    {file.year}
                  </option>
                ))}
              </select>
            </div>

            {/* Report Type */}
            <div>
              <label
                htmlFor="reportType"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Report Type
              </label>

              <select
                id="reportType"
                name="reportType"
                value={formData.reportType}
                onChange={handleInputChange}
                disabled={isGenerating}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                <option>Complete Academic Report</option>
                <option>Semester Summary Report</option>
                <option>Subject-wise Performance Report</option>
                <option>Backlog Report</option>
                <option>Top Students Report</option>
              </select>
            </div>

            {/* Report Format */}
            <div>
              <label
                htmlFor="reportFormat"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Report Format
              </label>

              <select
                id="reportFormat"
                name="reportFormat"
                value={formData.reportFormat}
                onChange={handleInputChange}
                disabled={isGenerating}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                <option>PDF</option>
                <option>Excel</option>
              </select>
            </div>
          </div>

          {/* Information */}
          <div className="mt-5 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
            <FileSpreadsheet
              size={19}
              className="mt-0.5 shrink-0 text-primary"
            />

            <p className="font-voces text-sm leading-6 text-gray-700">
              The report will be generated using grades, SGPA, pass percentage,
              subject performance, top students, and backlog information from
              the selected result file.
            </p>
          </div>

          {/* Generate button */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleGenerateReport}
              disabled={!formData.resultFileId || isGenerating}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0069d9] focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <FileDown size={18} />
                  Generate {formData.reportFormat} Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated reports */}
      <div className="mt-5 rounded-xl border border-gray-200 bg-white">
        {/* Section heading */}
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="font-raleway text-lg font-bold text-gray-900">
            Generated Reports
          </h2>

          <p className="mt-1 font-voces text-sm text-secondary">
            View and download previously generated academic reports.
          </p>
        </div>

        {/* Search and filters */}
        <div className="grid grid-cols-1 gap-4 border-b border-gray-200 p-5 md:grid-cols-[minmax(0,1fr)_170px_170px]">
          <div className="relative">
            <Search
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by report name, type, or semester..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={formatFilter}
            onChange={(event) => setFormatFilter(event.target.value)}
            aria-label="Filter reports by format"
            className="rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All Formats</option>
            <option value="PDF">PDF</option>
            <option value="Excel">Excel</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter reports by status"
            className="rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Processing">Processing</option>
          </select>
        </div>

        {/* Reports table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Report Name
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Report Type
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Format
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Generated Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-gray-50"
                  >
                    {/* Report name */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-primary">
                          {report.format === "PDF" ? (
                            <FileText size={17} />
                          ) : (
                            <FileSpreadsheet size={17} />
                          )}
                        </div>

                        <span className="max-w-[260px] break-all text-sm font-bold text-gray-800">
                          {report.reportName}
                        </span>
                      </div>
                    </td>

                    {/* Report type */}
                    <td className="px-5 py-3.5 text-sm text-secondary">
                      {report.reportType}
                    </td>

                    {/* Format */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${
                          report.format === "PDF"
                            ? "border-red-200 bg-red-50 text-red-600"
                            : "border-green-200 bg-green-50 text-green-700"
                        }`}
                      >
                        {report.format}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-3.5 text-sm text-secondary">
                      {report.generatedDate}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      {report.status === "Completed" ? (
                        <span className="inline-flex rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                          <Loader2 size={12} className="animate-spin" />
                          Processing
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      {report.status === "Completed" ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 transition hover:border-primary hover:bg-blue-50 hover:text-primary"
                          >
                            <Eye size={14} />
                            View
                          </button>

                          <button
                            type="button"
                            className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-bold text-white transition hover:bg-[#0069d9]"
                          >
                            <Download size={14} />
                            Download
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteReport(report.id)}
                            title="Delete report"
                            aria-label={`Delete ${report.reportName}`}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-red-200 text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="flex cursor-not-allowed items-center gap-1.5 rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-xs font-bold text-gray-500"
                        >
                          <Loader2 size={14} className="animate-spin" />
                          Generating
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <FileText
                      size={34}
                      className="mx-auto mb-3 text-gray-300"
                    />

                    <p className="font-raleway text-sm font-bold text-gray-700">
                      No reports found
                    </p>

                    <p className="mt-1 font-voces text-sm text-secondary">
                      Try changing your search or filter options.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Reports;
