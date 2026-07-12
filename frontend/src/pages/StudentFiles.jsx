import { useState } from "react";
import DashboardLayout from "../components/common/DashboardLayout";

import {
  AlertCircle,
  CheckCircle,
  FileCheck,
  FileSpreadsheet,
  GraduationCap,
  UploadCloud,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

function StudentFiles() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [extractionResult, setExtractionResult] = useState(null);

  const [formData, setFormData] = useState({
    program: "Bachelor of Computer Application",
    // semester: "Sixth",
    academicYear: "2025",
    // academicSession: "Spring",
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

  const handleUploadAndExtract = () => {
    if (!selectedFile) {
      toast.warning("Please select a file first.");
      return;
    }

    setExtractionResult({
      totalRows: 45,
      validRecords: 43,
      invalidRecords: 2,
      duplicateRecords: 0,
      status: "Ready for Fetch",
    });
  };

  const summaryCards = [
    {
      title: "Total Files",
      value: "12",
      description: "Uploaded semester files",
      icon: FileSpreadsheet,
    },
    {
      title: "Ready for Fetch",
      value: "10",
      description: "Validated files",
      icon: FileCheck,
    },
    {
      title: "Extraction Failed",
      value: "2",
      description: "Need correction",
      icon: AlertCircle,
    },
    {
      title: "Total Records",
      value: "320",
      description: "Student lookup records",
      icon: GraduationCap,
    },
  ];

  return (
    <DashboardLayout
      title="Student Files"
      // subtitle="Manage uploaded student lookup files"
    >
      <div className="mb-6">
        <h1 className="font-raleway text-3xl font-extrabold text-gray-900">
          Student Files
        </h1>

        <p className="font-voces mt-1 text-secondary">
          Upload, extract, validate, and manage student lookup files.
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
                <Icon size={26} />
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
        <div className="mb-5">
          <h2 className="font-raleway text-xl font-bold text-gray-900">
            Upload Student Lookup File
          </h2>

          <p className="font-voces mt-2 text-sm text-secondary">
            Select program and academic year before uploading the student lookup
            file.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Program
            </label>

            <select
              name="program"
              value={formData.program}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-blue-100"
            >
              <option>Bachelor of Computer Application</option>
              <option>Bachelor of Computer Engineering</option>
              <option>Bachelor of Software Engineering</option>
            </select>
          </div>

          {/* <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Semester
            </label>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-blue-100"
            >
              <option>First</option>
              <option>Second</option>
              <option>Third</option>
              <option>Fourth</option>
              <option>Fifth</option>
              <option>Sixth</option>
              <option>Seventh</option>
              <option>Eighth</option>
            </select>
          </div> */}

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Academic Year
            </label>

            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-blue-100"
            >
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>
          </div>

          {/* <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Academic Session
            </label>

            <select
              name="academicSession"
              value={formData.academicSession}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-blue-100"
            >
              <option>Spring</option>
              <option>Fall</option>
              <option>Winter</option>
              <option>Annual</option>
            </select>
          </div> */}
        </div>

        <label
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`mt-5 block cursor-pointer rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
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

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-primary">
            <UploadCloud size={32} />
          </div>

          <h3 className="font-raleway text-lg font-bold text-gray-900">
            Drag and drop your file here
          </h3>

          <p className="font-voces mt-1 text-secondary">
            or click to browse from your computer
          </p>

          <p className="mt-4 text-sm text-secondary">
            Supported formats:{" "}
            <span className="font-bold text-gray-700">.xlsx, .xls, .csv</span>
          </p>

          <p className="mt-1 text-sm text-secondary">
            Required columns:{" "}
            <span className="font-bold text-primary">
              exam_roll_number, date_of_birth
            </span>
          </p>
        </label>

        {selectedFile && (
          <div className="mt-5 flex flex-col gap-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary">
                <FileSpreadsheet size={22} />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900">
                  {selectedFile.name}
                </p>

                <p className="font-voces text-xs text-secondary">
                  {(selectedFile.size / 1024).toFixed(2)} KB | Ready to upload
                </p>
              </div>
            </div>

            <button
              onClick={removeSelectedFile}
              className="flex items-center gap-2 text-sm font-bold text-red-600 hover:underline"
            >
              <X size={16} />
              Remove
            </button>
          </div>
        )}

        <button
          onClick={handleUploadAndExtract}
          className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white transition hover:bg-[#0069d9]"
        >
          <UploadCloud size={20} />
          Upload and Extract Records
        </button>

        {extractionResult && (
          <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5">
            <div className="mb-4 flex items-center gap-3">
              <CheckCircle size={24} className="text-green-700" />

              <div>
                <h3 className="font-raleway text-lg font-bold text-green-800">
                  Extraction Completed
                </h3>

                <p className="font-voces text-sm text-green-700">
                  Student records extracted and validated successfully.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <div className="rounded-xl border border-green-100 bg-white p-4">
                <p className="text-sm text-secondary">Total Rows</p>
                <strong className="text-xl text-gray-900">
                  {extractionResult.totalRows}
                </strong>
              </div>

              <div className="rounded-xl border border-green-100 bg-white p-4">
                <p className="text-sm text-secondary">Valid Records</p>
                <strong className="text-xl text-green-700">
                  {extractionResult.validRecords}
                </strong>
              </div>

              <div className="rounded-xl border border-green-100 bg-white p-4">
                <p className="text-sm text-secondary">Invalid Records</p>
                <strong className="text-xl text-red-600">
                  {extractionResult.invalidRecords}
                </strong>
              </div>

              <div className="rounded-xl border border-green-100 bg-white p-4">
                <p className="text-sm text-secondary">Duplicates</p>
                <strong className="text-xl text-gray-900">
                  {extractionResult.duplicateRecords}
                </strong>
              </div>

              <div className="rounded-xl border border-green-100 bg-white p-4">
                <p className="text-sm text-secondary">Status</p>
                <strong className="text-lg text-primary">
                  {extractionResult.status}
                </strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default StudentFiles;
