import DashboardLayout from "../components/common/DashboardLayout";

function StudentFiles() {
  return (
    <DashboardLayout
      title="Student Files"
      subtitle="Manage uploaded student lookup files"
    >
      <div className="mb-6">
        <h1 className="font-raleway text-3xl font-extrabold text-gray-900">
          Student Files
        </h1>

        <p className="font-voces mt-1 text-secondary">
          Upload, extract, validate, and manage student lookup files.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="font-raleway text-xl font-bold text-gray-900">
          Upload Student Lookup File
        </h2>

        <p className="font-voces mt-2 text-sm text-secondary">
          This section will contain the drag-and-drop Excel/CSV upload area.
        </p>
      </div>
    </DashboardLayout>
  );
}

export default StudentFiles;
