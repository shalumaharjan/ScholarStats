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

  return (
    <DashboardLayout
      title="Fetch Status"
      subtitle="Track result fetching progress"
    >
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
        <h2 className="font-raleway text-xl font-bold text-gray-900">
          Student Fetch Records
        </h2>

        <p className="font-voces mt-2 text-sm text-secondary">
          Student-wise status table will be added here.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default FetchStatus;
