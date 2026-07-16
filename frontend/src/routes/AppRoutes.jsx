import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login/Login";
import Dashboard from "../pages/Dashboard";
import StudentFiles from "../pages/StudentFiles";
import FetchResult from "../pages/FetchResult";
import FetchStatus from "../pages/FetchStatus";
import UnderConstruction from "../pages/UnderConstruction";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student-files" element={<StudentFiles />} />
        <Route path="/fetch-result" element={<FetchResult />} />
        <Route path="/fetch-status" element={<FetchStatus />} />
        <Route path="/upload-report" element={<UnderConstruction />} />
        <Route path="/semester-analysis" element={<UnderConstruction />} />
        <Route path="/reports" element={<UnderConstruction />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
