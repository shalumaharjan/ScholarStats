import { ArrowLeft, Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UnderConstruction() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 font-biryani">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white px-6 py-10 text-center sm:px-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-700">
          <Construction size={28} />
        </div>

        <h1 className="mt-5 font-raleway text-2xl font-extrabold text-gray-900">
          Under Construction
        </h1>

        <p className="mx-auto mt-3 max-w-md font-voces text-sm leading-6 text-secondary">
          This feature is currently being developed. We are working to make this
          module available soon.
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mx-auto mt-7 flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0069d9] focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    </div>
  );
}

export default UnderConstruction;
