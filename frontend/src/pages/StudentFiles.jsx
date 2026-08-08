import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStudentFiles,
  uploadStudentFile,
  getStudentRecords,
  deleteStudentFile,
} from "../services/studentFileService";
import {
  AlertCircle,
  CheckCircle,
  FileCheck,
  FileSpreadsheet,
  GraduationCap,
  Send,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

function StudentFiles() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [savedFiles, setSavedFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);

  const [isDragging, setIsDragging] = useState(false);
  const [extractionResult, setExtractionResult] = useState(null);

  const [studentRecords, setStudentRecords] = useState([]);
  const [showRecords, setShowRecords] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchStudentFiles = async () => {
    try {
      const data = await getStudentFiles();

      setSavedFiles(data);
    } catch (error) {
      console.error("Failed to fetch student files:", error);

      toast.error("Failed to load student files");
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    fetchStudentFiles();
  }, []);

  const [formData, setFormData] = useState({
    program: "Bachelor of Computer Application",
    academicYear: "2025",
    academicSession: "Spring",
    semester: "5",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileSelect = (file) => {
    if (!file) return;

    const allowedExtensions = [".csv", ".xls", ".xlsx"];
    const fileName = file.name.toLowerCase();

    const isValidFile = allowedExtensions.some((extension) =>
      fileName.endsWith(extension),
    );

    if (!isValidFile) {
      toast.error("Only CSV, XLS, and XLSX files are allowed.");
      return;
    }

    setSelectedFile(file);
    setExtractionResult(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setExtractionResult(null);
  };

  const handleUploadAndExtract = async () => {
    if (!selectedFile) {
      toast.warning("Please select a file first.");
      return;
    }

    try {
      console.log(formData);
      const response = await uploadStudentFile(selectedFile, formData);
      toast.success(response.message);
      setExtractionResult({
        totalRows: response.total_students,
        validRecords: response.total_students,
        invalidRecords: 0,
        duplicateRecords: 0,
        status: "Ready for Fetch",
      });

      // refresh saved files table
      fetchStudentFiles();
      setSelectedFile(null);
    } catch (error) {
      console.log(JSON.stringify(error.response?.data, null, 2));

      toast.error("Upload failed");
    }
  };

  const handleViewStudents = async (fileId) => {
    console.log("Clicked file id:", fileId);
    try {
      const data = await getStudentRecords(fileId);

      setStudentRecords(data);

      setShowRecords(true);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load student records");
    }
  };

  const handleDeleteFile = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);

      const response = await deleteStudentFile(deleteTarget.file_id);

      toast.success(response.message);

      setDeleteTarget(null);

      await fetchStudentFiles();
    } catch (error) {
      console.error("Delete failed:", error);

      toast.error(
        error.response?.data?.detail || "Failed to delete student file",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const totalFiles = savedFiles.length;

  const readyForFetch = savedFiles.filter(
    (file) => file.upload_status === "Uploaded" && file.total_students > 0,
  ).length;

  const totalRecords = savedFiles.reduce(
    (total, file) => total + (file.total_students || 0),
    0,
  );

  const totalPrograms = new Set(
    savedFiles.map((file) => file.program).filter(Boolean),
  ).size;

  const summaryCards = [
    {
      title: "Total Files",
      value: totalFiles,
      description: "Uploaded student files",
      icon: FileSpreadsheet,
    },
    {
      title: "Ready for Fetch",
      value: readyForFetch,
      description: "Files ready for result fetching",
      icon: FileCheck,
    },
    {
      title: "Total Records",
      value: totalRecords,
      description: "Student lookup records",
      icon: GraduationCap,
    },
    {
      title: "Programs",
      value: totalPrograms,
      description: "Programs with uploaded files",
      icon: CheckCircle,
    },
  ];

  const getStatusBadge = (status) => {
    if (status === "Extracted" || status === "Validated") {
      return "bg-green-50 text-green-700 border-green-200";
    }
    if (status === "Failed" || status === "Invalid") {
      return "bg-red-50 text-red-700 border-red-200";
    }
    return "bg-blue-50 text-primary border-blue-200";
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
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload section */}
      <div className="rounded-xl border border-gray-200 bg-white">
        {/* Section heading */}
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="font-raleway text-lg font-bold text-gray-900">
            Upload Student Lookup File
          </h2>

          <p className="mt-1 font-voces text-sm text-secondary">
            Select program and academic year before uploading the student lookup
            file.
          </p>
        </div>

        <div className="p-5">
          {/* File information */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Program */}
            <div>
              <label
                htmlFor="program"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Program
              </label>

              <select
                id="program"
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
              >
                <option>Bachelor of Computer Application</option>
                <option>Bachelor of Computer Engineering</option>
                <option>Bachelor of Software Engineering</option>
              </select>
            </div>

            {/* Academic Year */}
            <div>
              <label
                htmlFor="academicYear"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Academic Year
              </label>

              <select
                id="academicYear"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
              >
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
              </select>
            </div>

            {/* Academic Session */}
            <div>
              <label
                htmlFor="academicSession"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Academic Session
              </label>

              <select
                id="academicSession"
                name="academicSession"
                value={formData.academicSession}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
              >
                <option>Spring</option>
                <option>Fall</option>
                <option>Winter</option>
                <option>Annual</option>
              </select>
            </div>

            {/* Semester */}
            <div>
              <label
                htmlFor="semester"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Semester
              </label>

              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
              >
                <option value="1">First Semester</option>
                <option value="2">Second Semester</option>
                <option value="3">Third Semester</option>
                <option value="4">Fourth Semester</option>
                <option value="5">Fifth Semester</option>
                <option value="6">Sixth Semester</option>
                <option value="7">Seventh Semester</option>
                <option value="8">Eighth Semester</option>
              </select>
            </div>
          </div>

          {/* Upload area */}
          <label
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`mt-5 block cursor-pointer rounded-xl border-2 border-dashed px-6 py-9 text-center transition-colors ${
              isDragging
                ? "border-primary bg-blue-50"
                : "border-gray-300 bg-gray-50 hover:border-primary hover:bg-blue-50"
            }`}
          >
            <input
              type="file"
              accept=".csv,.xls,.xlsx"
              className="hidden"
              onChange={(event) => handleFileSelect(event.target.files[0])}
            />

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-blue-100 bg-white text-primary">
              <UploadCloud size={24} />
            </div>

            <h3 className="mt-4 font-raleway text-base font-bold text-gray-900">
              Drag and drop your file here
            </h3>

            <p className="mt-1 font-voces text-sm text-secondary">
              Or click to browse from your computer
            </p>

            <div className="mt-4 space-y-1 text-sm text-secondary">
              <p>
                Supported formats:{" "}
                <span className="font-bold text-gray-700">
                  .xlsx, .xls, .csv
                </span>
              </p>

              <p>
                Required columns:{" "}
                <span className="font-bold text-primary">
                  exam_roll_number, date_of_birth
                </span>
              </p>
            </div>
          </label>

          {/* Selected file */}
          {selectedFile && (
            <div className="mt-5 flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-primary">
                  <FileSpreadsheet size={19} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-900">
                    {selectedFile.name}
                  </p>

                  <p className="mt-0.5 font-voces text-xs text-secondary">
                    {(selectedFile.size / 1024).toFixed(2)} KB · Ready to upload
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={removeSelectedFile}
                className="flex w-fit items-center gap-1.5 rounded-md border border-red-200 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
              >
                <X size={14} />
                Remove
              </button>
            </div>
          )}

          {/* Upload action */}
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleUploadAndExtract}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0069d9] focus:outline-none focus:ring-2 focus:ring-blue-300 sm:w-auto"
            >
              <UploadCloud size={18} />
              Upload and Extract Records
            </button>
          </div>

          {/* Extraction result */}
          {extractionResult && (
            <div className="mt-5 rounded-xl border border-green-200 bg-green-50">
              <div className="flex items-start gap-3 border-b border-green-200 px-5 py-4">
                <CheckCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-green-700"
                />

                <div>
                  <h3 className="font-raleway text-base font-bold text-green-800">
                    Extraction Completed
                  </h3>

                  <p className="mt-1 font-voces text-sm text-green-700">
                    Student records extracted and validated successfully.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 xl:grid-cols-5">
                <div className="rounded-lg border border-green-200 bg-white p-4">
                  <p className="text-xs font-semibold text-secondary">
                    Total Rows
                  </p>

                  <strong className="mt-1 block font-raleway text-xl text-gray-900">
                    {extractionResult.totalRows}
                  </strong>
                </div>

                <div className="rounded-lg border border-green-200 bg-white p-4">
                  <p className="text-xs font-semibold text-secondary">
                    Valid Records
                  </p>

                  <strong className="mt-1 block font-raleway text-xl text-green-700">
                    {extractionResult.validRecords}
                  </strong>
                </div>

                <div className="rounded-lg border border-green-200 bg-white p-4">
                  <p className="text-xs font-semibold text-secondary">
                    Invalid Records
                  </p>

                  <strong className="mt-1 block font-raleway text-xl text-red-600">
                    {extractionResult.invalidRecords}
                  </strong>
                </div>

                <div className="rounded-lg border border-green-200 bg-white p-4">
                  <p className="text-xs font-semibold text-secondary">
                    Duplicates
                  </p>

                  <strong className="mt-1 block font-raleway text-xl text-gray-900">
                    {extractionResult.duplicateRecords}
                  </strong>
                </div>

                <div className="rounded-lg border border-green-200 bg-white p-4">
                  <p className="text-xs font-semibold text-secondary">Status</p>

                  <strong className="mt-1 block text-sm font-bold text-primary">
                    {extractionResult.status}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Saved student files */}
      <div className="mt-5 rounded-xl border border-gray-200 bg-white">
        {/* Section heading */}
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="font-raleway text-lg font-bold text-gray-900">
            Saved Student Files
          </h2>

          <p className="mt-1 font-voces text-sm text-secondary">
            Previously uploaded files that can be reused for result fetching.
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
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
                  Session
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Records
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Uploaded Date
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loadingFiles ? (
                <tr>
                  <td colSpan="7" className="px-5 py-5 text-center">
                    Loading files...
                  </td>
                </tr>
              ) : (
                savedFiles.map((file) => (
                  <tr
                    key={file.file_id}
                    className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-primary">
                          <FileSpreadsheet size={17} />
                        </div>

                        <span className="text-sm font-bold text-gray-800">
                          {file.original_file_name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-sm text-secondary">
                      {file.program}
                    </td>

                    <td className="px-5 py-3.5 text-sm text-secondary">
                      Semester {file.semester}
                    </td>

                    <td className="px-5 py-3.5 text-sm text-secondary">
                      {file.academic_session}
                    </td>

                    <td className="px-5 py-3.5 text-sm font-bold text-gray-800">
                      {file.total_students}
                    </td>

                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${getStatusBadge(
                          file.upload_status,
                        )}`}
                      >
                        {file.upload_status}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-sm text-secondary">
                      {new Date(file.uploaded_at).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/student-records/${file.file_id}`)
                          }
                          className="rounded-md border border-gray-200 px-3 py-2 text-xs font-bold text-gray-700 transition hover:border-primary hover:bg-blue-50 hover:text-primary"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          className="flex items-center gap-1.5 rounded-md border border-green-200 px-3 py-2 text-xs font-bold text-green-700 transition hover:bg-green-50"
                        >
                          <Send size={13} />
                          Use
                        </button>

                        <button
                          type="button"
                          title="Delete file"
                          onClick={() => setDeleteTarget(file)}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-red-200 text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showRecords && (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b px-5 py-4">
            <h2 className="text-lg font-bold text-gray-800">Student Records</h2>

            <p className="text-sm text-gray-500">
              Total Students: {studentRecords.length}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-sm font-bold text-gray-700">
                    CRN
                  </th>

                  <th className="px-5 py-3 text-left text-sm font-bold text-gray-700">
                    ERN
                  </th>

                  <th className="px-5 py-3 text-left text-sm font-bold text-gray-700">
                    Student Name
                  </th>

                  <th className="px-5 py-3 text-left text-sm font-bold text-gray-700">
                    Registration No.
                  </th>

                  <th className="px-5 py-3 text-left text-sm font-bold text-gray-700">
                    DOB
                  </th>

                  <th className="px-5 py-3 text-left text-sm font-bold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {studentRecords.map((student) => (
                  <tr
                    key={student.record_id}
                    className="border-b last:border-none"
                  >
                    <td className="px-5 py-3 text-sm">{student.crn}</td>

                    <td className="px-5 py-3 text-sm">{student.ern}</td>

                    <td className="px-5 py-3 text-sm font-medium">
                      {student.student_name}
                    </td>

                    <td className="px-5 py-3 text-sm">
                      {student.registration_no}
                    </td>

                    <td className="px-5 py-3 text-sm">{student.dob}</td>

                    <td className="px-5 py-3">
                      <span className="rounded-full border px-2.5 py-1 text-xs font-bold">
                        {student.processing_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={22} />
            </div>

            {/* Content */}
            <h3 className="mt-4 font-raleway text-xl font-extrabold text-gray-900">
              Delete Student File?
            </h3>

            <p className="mt-2 font-voces text-sm leading-6 text-secondary">
              Are you sure you want to delete{" "}
              <span className="font-bold text-gray-800">
                {deleteTarget.original_file_name}
              </span>
              ? This will also remove all student records extracted from this
              file.
            </p>

            {/* Warning */}
            <div className="mt-4 rounded-lg bg-red-50 px-4 py-3">
              <p className="font-voces text-sm text-red-700">
                This action cannot be undone.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg bg-gray-100 px-4 py-2.5 font-raleway text-sm font-bold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteFile}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 font-raleway text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 size={15} />

                {isDeleting ? "Deleting..." : "Delete File"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentFiles;
