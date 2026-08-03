import DashboardLayout from "../components/common/DashboardLayout";

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
    <DashboardLayout title="Fetch Status">
      <div className="mb-6">
        <h1 className="font-raleway text-3xl font-extrabold text-gray-900">
          Fetch Status
        </h1>

        <p className="font-voces mt-1 text-secondary">
          Monitor student result fetching progress, success, and failed records.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-voces text-sm text-secondary">
              Current Fetch Job
            </p>

            <h2 className="font-raleway text-xl font-bold text-gray-900">
              BCA Sixth Semester Result Fetch
            </h2>

            <p className="mt-1 text-sm text-secondary">
              Spring 2025 | Regular/Retake | BCA_6th_Sem_Students.xlsx
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-primary">
            <Loader2 size={16} className="animate-spin" />
            Processing
          </div>
        </div>
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
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-raleway text-xl font-bold text-gray-900">
              Student Fetch Records
            </h2>

            <p className="font-voces mt-1 text-sm text-secondary">
              Student-wise result fetching status from the university portal.
            </p>
          </div>

          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0069d9]">
            Refresh Status
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-y border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Exam Roll No.
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Student Name
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Message
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Attempt
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Fetched At
                </th>

                <th className="px-4 py-3 text-left text-sm font-bold text-secondary">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {studentFetchRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-100 transition hover:bg-gray-50"
                >
                  <td className="px-4 py-4 text-sm font-bold text-gray-800">
                    {record.examRollNumber}
                  </td>

                  <td className="px-4 py-4 text-sm text-secondary">
                    {record.studentName}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusBadge(
                        record.status,
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm text-secondary">
                    {record.message}
                  </td>

                  <td className="px-4 py-4 text-sm font-bold text-gray-800">
                    {record.attempt}
                  </td>

                  <td className="px-4 py-4 text-sm text-secondary">
                    {record.fetchedAt}
                  </td>

                  <td className="px-4 py-4">
                    {record.status === "Failed" ? (
                      <button className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100">
                        Retry
                      </button>
                    ) : record.status === "Success" ? (
                      <button className="rounded-lg bg-green-50 px-3 py-2 text-xs font-bold text-green-700 transition hover:bg-green-100">
                        View
                      </button>
                    ) : (
                      <button
                        disabled
                        className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-bold text-gray-400"
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
    </DashboardLayout>
  );
}

export default FetchStatus;
