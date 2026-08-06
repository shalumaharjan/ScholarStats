import { CheckCircle, Clock, Loader2, Users, XCircle } from "lucide-react";

function FetchStatus() {
  const summaryCards = [
    {
      title: "Total Students",
      value: "45",
      description: "Students in selected file",
      icon: Users,
    },
    {
      title: "Pending",
      value: "12",
      description: "Waiting to be fetched",
      icon: Clock,
    },
    {
      title: "Successful",
      value: "30",
      description: "Results fetched",
      icon: CheckCircle,
    },
    {
      title: "Failed",
      value: "3",
      description: "Need retry or correction",
      icon: XCircle,
    },
  ];

  const studentFetchRecords = [
    {
      id: 1,
      examRollNumber: "24530044",
      studentName: "Ram Sharma",
      status: "Success",
      message: "Result fetched successfully",
      attempt: 1,
      fetchedAt: "10:31 AM",
    },
    {
      id: 2,
      examRollNumber: "24530090",
      studentName: "Sita Thapa",
      status: "Processing",
      message: "Fetching result from portal",
      attempt: 1,
      fetchedAt: "-",
    },
    {
      id: 3,
      examRollNumber: "24530088",
      studentName: "Hari Adhikari",
      status: "Pending",
      message: "Waiting for fetch process",
      attempt: 0,
      fetchedAt: "-",
    },
    {
      id: 4,
      examRollNumber: "24530077",
      studentName: "Nisha Karki",
      status: "Failed",
      message: "Invalid DOB or result not found",
      attempt: 1,
      fetchedAt: "-",
    },
  ];

  const getStatusBadge = (status) => {
    if (status === "Success") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (status === "Failed") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    if (status === "Processing") {
      return "bg-blue-50 text-primary border-blue-200";
    }

    return "bg-yellow-50 text-yellow-700 border-yellow-200";
  };

  return (
    <>
      {/* Current fetch job */}
      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-voces text-xs text-secondary">
              Current Fetch Job
            </p>

            <h2 className="mt-1 font-raleway text-lg font-bold text-gray-900">
              BCA Sixth Semester Result Fetch
            </h2>

            <p className="mt-1 text-sm text-secondary">
              Spring 2025 | Regular/Retake | BCA_6th_Sem_Students.xlsx
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-bold text-primary">
            <Loader2 size={15} className="animate-spin" />
            Processing
          </div>
        </div>
      </div>

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

      {/* Student fetch records */}
      <div className="rounded-xl border border-gray-200 bg-white">
        {/* Section header */}
        <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-raleway text-lg font-bold text-gray-900">
              Student Fetch Records
            </h2>

            <p className="mt-1 font-voces text-sm text-secondary">
              Student-wise result fetching status from the university portal.
            </p>
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#0069d9] focus:outline-none focus:ring-2 focus:ring-blue-300 sm:w-auto"
          >
            Refresh Status
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Exam Roll No.
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Student Name
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Message
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Attempt
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Fetched At
                </th>

                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {studentFetchRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-100 transition-colors last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-800">
                    {record.examRollNumber}
                  </td>

                  <td className="px-5 py-3.5 text-sm text-secondary">
                    {record.studentName}
                  </td>

                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${getStatusBadge(
                        record.status,
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-sm text-secondary">
                    {record.message}
                  </td>

                  <td className="px-5 py-3.5 text-sm font-bold text-gray-800">
                    {record.attempt}
                  </td>

                  <td className="px-5 py-3.5 text-sm text-secondary">
                    {record.fetchedAt}
                  </td>

                  <td className="px-5 py-3.5">
                    {record.status === "Failed" ? (
                      <button
                        type="button"
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100"
                      >
                        Retry
                      </button>
                    ) : record.status === "Success" ? (
                      <button
                        type="button"
                        className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-xs font-bold text-green-700 transition hover:bg-green-100"
                      >
                        View
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-xs font-bold text-gray-400"
                      >
                        Waiting
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default FetchStatus;
