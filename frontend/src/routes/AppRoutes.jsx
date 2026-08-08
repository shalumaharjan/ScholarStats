import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login/Login";
import Dashboard from "../pages/Dashboard";
import StudentFiles from "../pages/StudentFiles";
import FetchResult from "../pages/FetchResult";
import FetchStatus from "../pages/FetchStatus";
import UnderConstruction from "../pages/UnderConstruction";
import NotFound from "../pages/NotFound";
import ResultFiles from "../pages/ResultFiles";
import SemesterAnalysis from "../pages/SemesterAnalysis";
import Reports from "../pages/Reports";

import ProtectedLayout from "../pages/ProtectedLayout";
import DashboardLayout from "../components/common/DashboardLayout";
import StudentRecords from "../pages/StudentRecords";

function AppRoutes() {
  return (
    <Routes>
      {/* ✅ Public routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* ✅ Protected routes */}
      <Route element={<ProtectedLayout />}>
        {/* Dashboard layout wrapper */}
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="student-files" element={<StudentFiles />} />
          <Route path="fetch-result" element={<FetchResult />} />
          <Route path="fetch-status" element={<FetchStatus />} />
          <Route path="result-files" element={<ResultFiles />} />
          <Route path="semester-analysis" element={<SemesterAnalysis />} />
          <Route path="reports" element={<Reports />} />
          <Route path="/student-records/:fileId" element={<StudentRecords />} />
          <Route path="under-construction" element={<UnderConstruction />} />
        </Route>
      </Route>

      {/* ❌ Unknown route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;