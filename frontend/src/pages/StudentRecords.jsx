import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  FileSpreadsheet,
  GraduationCap,
  Search,
  Users,
} from "lucide-react";

import { getStudentRecords } from "../services/studentFileService";

function StudentRecords() {
  const { fileId } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, [fileId]);

  const fetchRecords = async () => {
    try {
      const data = await getStudentRecords(fileId);
      setStudents(data);
    } catch (error) {
      console.error("Failed to load student records:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    return (
      student.student_name?.toLowerCase().includes(searchText) ||
      student.crn?.toLowerCase().includes(searchText) ||
      student.ern?.toLowerCase().includes(searchText) ||
      student.registration_no?.toLowerCase().includes(searchText)
    );
  });

  const program = students[0]?.program || "—";
  const semester = students[0]?.semester || "—";

  const getProgramShortName = (programName) => {
    if (programName === "Bachelor of Computer Application") {
      return "BCA";
    }

    if (programName === "Bachelor of Computer Engineering") {
      return "BCE";
    }

    if (programName === "Bachelor of Software Engineering") {
      return "BSE";
    }

    return programName;
  };

  return (
    <>
      {/* Back button + heading */}
      <div className="mb-5">
        <button
          type="button"
          onClick={() => navigate("/student-files")}
          className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2.5 font-raleway text-sm font-bold text-primary shadow-sm transition hover:bg-blue-50"
        >
          <ArrowLeft size={17} />
          Back to Student Files
        </button>

        <h1 className="font-raleway text-2xl font-extrabold text-gray-900">
          Student Records
        </h1>

        <p className="mt-1 font-voces text-sm text-secondary">
          View student information extracted from the uploaded lookup file.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Students */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-raleway text-sm font-bold text-gray-700">
                Total Students
              </p>

              <h3 className="mt-2 font-raleway text-3xl font-extrabold text-gray-900">
                {students.length}
              </h3>

              <p className="mt-1 font-voces text-sm text-secondary">
                Uploaded records
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
              <Users size={21} />
            </div>
          </div>
        </div>

        {/* Program */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-raleway text-sm font-bold text-gray-700">
                Program
              </p>

              <h3 className="mt-2 font-raleway text-2xl font-extrabold text-gray-900">
                {getProgramShortName(program)}
              </h3>

              <p className="mt-1 max-w-[220px] font-voces text-sm leading-5 text-secondary">
                {program}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
              <GraduationCap size={21} />
            </div>
          </div>
        </div>

        {/* Semester */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-raleway text-sm font-bold text-gray-700">
                Semester
              </p>

              <h3 className="mt-2 font-raleway text-2xl font-extrabold text-gray-900">
                {semester}
              </h3>

              <p className="mt-1 font-voces text-sm text-secondary">
                Selected semester
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
              <CalendarDays size={21} />
            </div>
          </div>
        </div>

        {/* File */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-raleway text-sm font-bold text-gray-700">
                File
              </p>

              <h3 className="mt-2 font-raleway text-xl font-extrabold text-gray-900">
                Uploaded
              </h3>

              <p className="mt-1 font-voces text-sm text-secondary">
                Student lookup file
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
              <FileSpreadsheet size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5 flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 shadow-sm">
        <Search size={19} className="shrink-0 text-gray-400" />

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by student name, CRN, ERN or registration number..."
          className="w-full bg-transparent font-voces text-sm text-gray-800 outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Student list */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h2 className="font-raleway text-lg font-bold text-gray-900">
              Student List
            </h2>

            <p className="mt-1 font-voces text-sm text-secondary">
              {search
                ? `${filteredStudents.length} matching record${
                    filteredStudents.length !== 1 ? "s" : ""
                  }`
                : `${students.length} student records`}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-3.5 text-left font-raleway text-xs font-bold uppercase tracking-wide text-secondary">
                  CRN
                </th>

                <th className="px-5 py-3.5 text-left font-raleway text-xs font-bold uppercase tracking-wide text-secondary">
                  ERN
                </th>

                <th className="px-5 py-3.5 text-left font-raleway text-xs font-bold uppercase tracking-wide text-secondary">
                  Student Name
                </th>

                <th className="px-5 py-3.5 text-left font-raleway text-xs font-bold uppercase tracking-wide text-secondary">
                  Registration No.
                </th>

                <th className="px-5 py-3.5 text-left font-raleway text-xs font-bold uppercase tracking-wide text-secondary">
                  DOB
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-12 text-center font-voces text-sm text-secondary"
                  >
                    Loading student records...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-12 text-center">
                    <Search size={26} className="mx-auto mb-2 text-gray-300" />

                    <p className="font-raleway text-sm font-bold text-gray-700">
                      No students found
                    </p>

                    <p className="mt-1 font-voces text-sm text-secondary">
                      Try searching with another name, CRN or ERN.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr
                    key={student.record_id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-voces text-sm font-semibold text-gray-800">
                      {student.crn}
                    </td>

                    <td className="px-5 py-4 font-voces text-sm text-gray-700">
                      {student.ern || "—"}
                    </td>

                    <td className="px-5 py-4 font-raleway text-sm font-bold text-gray-900">
                      {student.student_name}
                    </td>

                    <td className="px-5 py-4 font-voces text-sm text-gray-700">
                      {student.registration_no || "—"}
                    </td>

                    <td className="px-5 py-4 font-voces text-sm text-gray-700">
                      {student.dob || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StudentRecords;
