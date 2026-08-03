import { ArrowLeft, FileQuestion } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 font-biryani">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white px-6 py-10 text-center sm:px-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-primary">
          <FileQuestion size={28} />
        </div>

        <h1 className="mt-5 font-raleway text-7xl font-extrabold text-primary">
          404
        </h1>

        <h2 className="mt-3 font-raleway text-2xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mx-auto mt-2 max-w-md font-voces text-sm leading-6 text-secondary">
          Sorry, the page you are looking for does not exist or may have been
          moved.
        </p>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mx-auto mt-7 flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0069d9] focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default NotFound;
