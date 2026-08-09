import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { getStudentFiles } from "../services/studentFileService";

function FetchResult() {
  const navigate = useNavigate();

  const [studentFiles, setStudentFiles] = useState([]);

  const [loadingFiles, setLoadingFiles] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [searchParams] = useSearchParams();

  const fileIdFromUrl = searchParams.get("fileId");

  const [formData, setFormData] = useState({
    studentFileId: "",
    resultType: "Regular/Retake",
    semester: "Sixth",
    academicYear: "2025",
    academicSession: "Spring",
  });

  const fetchStudentFiles = async () => {
    try {
      setLoadingFiles(true);
      const data = await getStudentFiles();
      setStudentFiles(data);
    } catch (error) {
      console.error("Failed to load student files:", error);
      toast.error("Failed to load student files");
    } finally {
      setLoadingFiles(false);
    }
  };

  const convertSemester = (number) => {
    const semesters = {
      1: "First",
      2: "Second",
      3: "Third",
      4: "Fourth",
      5: "Fifth",
      6: "Sixth",
      7: "Seventh",
      8: "Eighth",
    };
    return semesters[number] || "";
  };

  // Temporary frontend data
  // Later this data will come from backend:
  // GET http://localhost:5000/api/student-files

  useEffect(() => {
    fetchStudentFiles();
  }, []);

  useEffect(() => {
    if (fileIdFromUrl && studentFiles.length > 0) {
      const selectedFile = studentFiles.find(
        (file) => file.file_id === Number(fileIdFromUrl),
      );
      if (selectedFile) {
        setFormData((previous) => ({
          ...previous,
          studentFileId: selectedFile.file_id,
          academicYear: selectedFile.academic_year,
          academicSession: selectedFile.academic_session,
          semester: convertSemester(selectedFile.semester),
        }));
      }
    }
  }, [fileIdFromUrl, studentFiles]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFetchResult = async () => {
    if (!formData.studentFileId) {
      alert("Please select a student file first.");
      return;
    }

    try {
      setFetching(true);
      const response = await axiosInstance.post("/fetch-jobs", formData);
      alert(response.data.message || "Result fetch process started.");
      navigate(`/fetch-status?jobId=${response.data.fetchJobId}`);
    } catch (error) {
      console.error("Fetch job error:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while starting result fetch.",
      );
    } finally {
      setFetching(false);
    }
  };

  return (
    <>
      {/* Fetch form */}
      <div className="rounded-xl border border-gray-200 bg-white">
        {/* Card heading */}
        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="font-raleway text-lg font-bold text-gray-900">
            Result Fetch Details
          </h2>

          <p className="mt-1 font-voces text-sm text-secondary">
            Choose the student file and examination information.
          </p>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Student File */}
            <div className="md:col-span-2">
              <label
                htmlFor="studentFileId"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Student File
              </label>

              <select
                id="studentFileId"
                name="studentFileId"
                value={formData.studentFileId}
                onChange={handleInputChange}
                disabled={loadingFiles}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
              >
                {studentFiles.length === 0 && (
                  <option value="">No ready student files available</option>
                )}

                {studentFiles.map((file) => (
                  <option key={file.file_id} value={file.file_id}>
                    {file.original_file_name}
                    {" - "}
                    {file.program}
                    {" ("}
                    {file.total_students}
                    {" Students)"}
                  </option>
                ))}
              </select>

              {loadingFiles && (
                <p className="mt-1.5 font-voces text-xs text-secondary">
                  Loading available student files...
                </p>
              )}
            </div>

            {/* Result Type */}
            <div>
              <label
                htmlFor="resultType"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Result Type
              </label>

              <select
                id="resultType"
                name="resultType"
                value={formData.resultType}
                onChange={handleInputChange}
                disabled={fetching}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                <option>Regular/Retake</option>
                <option>Rechecking/Retotaling</option>
                <option>Chance</option>
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
                disabled={fetching}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
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
                disabled={fetching}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
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
                disabled={fetching}
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                <option>Spring</option>
                <option>Fall</option>
                <option>Winter</option>
                <option>Annual</option>
              </select>
            </div>
          </div>

          {/* Information */}
          <div className="mt-5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
            <p className="font-voces text-sm leading-6 text-gray-700">
              The system will automatically fetch results from the university
              portal using the selected student file and portal details.
            </p>
          </div>

          {/* Action */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleFetchResult}
              disabled={fetching || loadingFiles || !formData.studentFileId}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0069d9] focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {fetching ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Starting Fetch Process...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Start Result Fetch
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FetchResult;
