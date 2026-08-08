import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GraduationCap, Loader2 } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

function ProtectedLayout() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await axiosInstance.get("/me");
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 font-biryani">
        <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white px-6 py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
            <GraduationCap size={24} />
          </div>

          <h1 className="mt-4 font-raleway text-xl font-extrabold text-gray-900">
            ScholarStats
          </h1>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-secondary">
            <Loader2 size={18} className="animate-spin text-primary" />
            Verifying your session...
          </div>

          <p className="mt-2 font-voces text-xs text-gray-500">
            Please wait while we confirm your login.
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
