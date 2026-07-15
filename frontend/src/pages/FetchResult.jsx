import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/common/DashboardLayout";
import { Search, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

function FetchResult() {
  const navigate = useNavigate();

  const [studentFiles, setStudentFiles] = useState([]);

  const [loadingFiles, setLoadingFiles] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [formData, setFormData] = useState({
    studentFileId: "",
    resultType: "Regular/Retake",
    semester: "Sixth",
    academicYear: "2025",
    academicSession: "Spring",
  });

  // Temporary frontend data
  // Later this data will come from backend:
  // GET http://localhost:5000/api/student-files

  useEffect(() => {
    const uploadedFiles = [
      {
        id: "1",
        fileName: "BCA_2024.xlsx",
        program: "Bachelor of Computer Application",
        studentCount: 320,
      },
      {
        id: "2",
        fileName: "BCE_2024.xlsx",
        program: "Bachelor of Computer Engineering",
        studentCount: 280,
      },
    ];
    setStudentFiles(uploadedFiles);
    if (uploadedFiles.length > 0) {
      setFormData((previous) => ({
        ...previous,
        studentFileId: uploadedFiles[0].id,
      }));
    }
    setLoadingFiles(false);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFetchResult = () => {
    if (!formData.studentFileId) {
      toast.warning("Please select a student file first.");
      return;
    }

    setFetching(true);
    /*
    POST http://localhost:5000/api/fetch-jobs

    Data sent:
    {
      studentFileId,
      resultType,
      semester,
      academicYear,
      academicSession
    }

    Backend will:
    1. Create fetch job.
    2. Load students from selected file.
    3. Use exam_roll_number and date_of_birth.
    4. Run Selenium automation.
    5. Store fetched results.
    6. Return fetchJobId.
  */

    // Temporary loading simulation
    setTimeout(() => {
      setFetching(false);
      toast.success("Result fetch process started.");
      navigate("/fetch-status");
    }, 2000);
  };

  return (
    <DashboardLayout
      title="Fetch Result"
      //   subtitle="Fetch student results from result portal"
    >
      <div className="mb-6">
        <h1 className="font-raleway text-3xl font-extrabold text-gray-900">
          Fetch Result
        </h1>
        <p className="font-voces mt-1 text-secondary">
          Select uploaded student file and fetch examination results.
        </p>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="font-raleway text-xl font-bold text-gray-900">
            Result Fetch Details
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Choose the student file and semester information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Student File */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Student File
            </label>
            <select
              name="studentFileId"
              value={formData.studentFileId}
              onChange={handleInputChange}
              disabled={loadingFiles}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-100"
            >
              {studentFiles.length === 0 && (
                <option value="">No ready student files available</option>
              )}

              {studentFiles.map((file) => (
                <option key={file.id} value={file.id}>
                  {file.fileName} - {file.program} ({file.studentCount}{" "}
                  Students)
                </option>
              ))}
            </select>
          </div>
          {/* Result Type */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Result Type
            </label>

            <select
              name="resultType"
              value={formData.resultType}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-blue-100"
            >
              <option>Regular/Retake</option>
              <option>Rechecking/Retotaling</option>
              <option>Chance</option>
            </select>
          </div>
          {/* Semester */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Semester
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
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
            <label className="mb-2 block text-sm font-bold text-gray-700">
              {" "}
              Academic Year
            </label>
            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            >
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>
          </div>
          {/* Academic Session */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Academic Session
            </label>
            <select
              name="academicSession"
              value={formData.academicSession}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            >
              <option>Spring</option>
              <option>Fall</option>
              <option>Winter</option>
              <option>Annual</option>
            </select>
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <p className="font-voces text-sm text-secondary">
            The system will automatically fetch results from the university
            portal using the selected student file and portal details.
          </p>
        </div>

        <button
          onClick={handleFetchResult}
          disabled={fetching || !formData.studentFileId}
          className="mt-8 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
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
    </DashboardLayout>
  );
}

export default FetchResult;
