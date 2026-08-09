import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  FileText,
  FileSpreadsheet,
  BarChart3,
  FileDown,
  Eye,
  Download,
} from "lucide-react";

function Reports() {
  const [selectedFile, setSelectedFile] = useState("");

  const [resultFiles, setResultFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [comingSoonMessage, setComingSoonMessage] = useState("");

  const [reportDetails, setReportDetails] = useState({
    batch: "",
    program: "",
    semester: "",
    session: "",
    verifiedBy: "",
    designation: "",
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [generatingOfficial, setGeneratingOfficial] = useState(false);

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

  const handleFileChange = (event) => {
    const id = event.target.value;

    setSelectedFile(id);
    setPreviewUrl("");

    const file = resultFiles.find((item) => String(item.id) === String(id));

    if (!file) {
      setReportDetails({
        batch: "",
        program: "",
        semester: "",
        session: "",
        verifiedBy: "",
        designation: "",
      });

      return;
    }

    setReportDetails((previous) => ({
      ...previous,
      batch: String(file.academicYear || ""),
      program: String(file.program || ""),
      semester: String(file.semester || ""),
      session: String(file.session || ""),
    }));
  };

  const handlePreviewOfficialReport = async () => {
    if (!isOfficialReportReady) {
      alert("Please complete all official report details.");
      return;
    }

    try {
      setGeneratingOfficial(true);

      const response = await axiosInstance.post(
        `/api/reports/result/${selectedFile}/pdf`,
        reportDetails,
        {
          responseType: "blob",
        },
      );

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const url = URL.createObjectURL(
        new Blob([response.data], {
          type: "application/pdf",
        }),
      );

      setPreviewUrl(url);
    } catch (error) {
      console.error("Official report preview error:", error);
    } finally {
      setGeneratingOfficial(false);
    }
  };

  const fetchResultFiles = async () => {
    try {
      setLoadingFiles(true);

      const response = await axiosInstance.get("/api/result-files");

      setResultFiles(response.data);
    } catch (error) {
      console.error("Result files error:", error);
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    fetchResultFiles();
  }, []);

  const isOfficialReportReady =
    selectedFile &&
    String(reportDetails.batch).trim() &&
    String(reportDetails.program).trim() &&
    String(reportDetails.semester).trim() &&
    String(reportDetails.session).trim() &&
    String(reportDetails.verifiedBy).trim() &&
    String(reportDetails.designation).trim();

  return (
    <>
      {/* Report Cards */}

      {/* Generate report */}
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
              Select a completed result file to generate reports.
            </p>
          </div>
        </div>

        {/* Select Result File */}
        <div className="p-5">
          <label
            htmlFor="resultFile"
            className="mb-2 block font-raleway text-sm font-bold text-gray-700"
          >
            Completed Result File
          </label>
          <select
            id="resultFile"
            value={selectedFile}
            onChange={handleFileChange}
            disabled={loadingFiles}
            className="w-full rounded-lg border border-gray-300 bg-white px-5 py-4 font-voces text-base text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
          >
            <option value="">
              {loadingFiles
                ? "Loading result files..."
                : "Select a result file"}
            </option>

            {resultFiles.map((file) => (
              <option key={file.id} value={file.id}>
                {file.fileName} — Semester {file.semester}, {file.session}{" "}
                {file.academicYear} ({file.students} students)
              </option>
            ))}
          </select>

          {selectedFile && (
            <div className="mt-5 border-t border-gray-200 pt-5">
              <h3 className="font-raleway text-base font-bold text-gray-900">
                Official Result Sheet Details
              </h3>

              <p className="mt-1 font-voces text-sm text-secondary">
                Review or edit the information that will appear on the printed
                result sheet.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-raleway text-sm font-bold text-gray-700">
                    Batch
                  </label>

                  <input
                    type="text"
                    value={reportDetails.batch}
                    onChange={(e) => {
                      setReportDetails({
                        ...reportDetails,
                        verifiedBy: e.target.value,
                      });

                      setPreviewUrl("");
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-raleway text-sm font-bold text-gray-700">
                    Program
                  </label>

                  <input
                    type="text"
                    value={reportDetails.program}
                    onChange={(e) => {
                      setReportDetails({
                        ...reportDetails,
                        verifiedBy: e.target.value,
                      });

                      setPreviewUrl("");
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-raleway text-sm font-bold text-gray-700">
                    Semester
                  </label>

                  <input
                    type="text"
                    value={reportDetails.semester}
                    onChange={(e) => {
                      setReportDetails({
                        ...reportDetails,
                        verifiedBy: e.target.value,
                      });

                      setPreviewUrl("");
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-raleway text-sm font-bold text-gray-700">
                    Academic Session
                  </label>

                  <input
                    type="text"
                    value={reportDetails.session}
                    onChange={(e) => {
                      setReportDetails({
                        ...reportDetails,
                        verifiedBy: e.target.value,
                      });

                      setPreviewUrl("");
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-raleway text-sm font-bold text-gray-700">
                    Verified By
                  </label>

                  <input
                    type="text"
                    value={reportDetails.verifiedBy}
                    onChange={(e) => {
                      setReportDetails({
                        ...reportDetails,
                        verifiedBy: e.target.value,
                      });

                      setPreviewUrl("");
                    }}
                    placeholder="HOD's name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-raleway text-sm font-bold text-gray-700">
                    Designation
                  </label>

                  <input
                    type="text"
                    value={reportDetails.designation}
                    onChange={(e) => {
                      setReportDetails({
                        ...reportDetails,
                        designation: e.target.value,
                      });

                      setPreviewUrl("");
                    }}
                    placeholder="e.g. HOD, Department of Computer Application"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <p className="mt-2 font-voces text-sm font-bold text-red-500">
                  Complete all report details before previewing the official
                  result sheet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Available Reports */}

      <div className="mt-5">
        <h2 className="mb-4 font-raleway text-lg font-bold text-gray-900">
          Available Reports
        </h2>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Official Result Sheet */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-primary">
              <FileText size={22} />
            </div>
            <h3 className="mt-4 font-raleway text-lg font-bold text-gray-900">
              Official Result Sheet
            </h3>
            <span className="mt-4 inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
              PDF
            </span>

            <p className="mt-2 font-voces text-sm leading-6 text-secondary">
              A4 print-ready semester result report containing student grades,
              SGPA and result summary.
            </p>
            <button
              type="button"
              onClick={handlePreviewOfficialReport}
              disabled={!isOfficialReportReady || generatingOfficial}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0069d9] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Eye size={17} />

              {generatingOfficial ? "Generating Preview..." : "Preview Report"}
            </button>
          </div>

          {/* Analysis Report */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-purple-100 bg-purple-50 text-purple-600">
              <BarChart3 size={22} />
            </div>

            <h3 className="mt-4 font-raleway text-lg font-bold text-gray-900">
              Semester Analysis Report
            </h3>
            <span className="mt-4 inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
              PDF
            </span>

            <p className="mt-2 font-voces text-sm leading-6 text-secondary">
              Academic performance report containing subject analysis, grade
              distribution and backlog details.
            </p>

            <button
              type="button"
              onClick={() => setComingSoonMessage("analysis")}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0069d9]"
            >
              <Download size={17} />
              Generate PDF
            </button>

            {comingSoonMessage === "analysis" && (
              <p className="mt-2 text-center font-voces text-sm font-bold text-red-600">
                Semester Analysis Report generation will be integrated soon.
              </p>
            )}
          </div>

          {/* Excel Export */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-green-100 bg-green-50 text-green-600">
              <FileSpreadsheet size={22} />
            </div>

            <h3 className="mt-4 font-raleway text-lg font-bold text-gray-900">
              Excel Export
            </h3>
            <span className="mt-4 inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
              XLSX
            </span>

            <p className="mt-2 font-voces text-sm leading-6 text-secondary">
              Download editable result data in Excel format for further use.
            </p>

            <button
              type="button"
              onClick={() => setComingSoonMessage("excel")}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0069d9]"
            >
              <Download size={17} />
              Download Excel
            </button>

            {comingSoonMessage === "excel" && (
              <p className="mt-2 text-center font-voces text-sm font-bold text-red-600">
                Excel export functionality will be integrated soon.
              </p>
            )}
          </div>
        </div>
      </div>

      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="font-raleway text-lg font-bold text-gray-900">
                  Official Result Sheet Preview
                </h2>

                <p className="mt-1 font-voces text-sm text-secondary">
                  Review the report before downloading or printing.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewUrl("")}
                className="rounded-lg px-3 py-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {/* PDF Preview */}
            <div className="min-h-0 flex-1 bg-gray-100 p-4">
              <iframe
                src={`${previewUrl}#toolbar=0&navpanes=0`}
                title="Official Result Report Preview"
                className="h-full w-full rounded-lg border border-gray-300 bg-white"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t border-gray-200 px-5 py-4">
              <button
                type="button"
                onClick={() => setPreviewUrl("")}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Close
              </button>

              <a
                href={previewUrl}
                download="Official_Result_Report.pdf"
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0069d9]"
              >
                <Download size={17} />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Reports;
