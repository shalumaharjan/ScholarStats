import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-blue-600">404</h1>

        <h2 className="mt-4 text-3xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500 max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default NotFound;
