import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login/Login";
import Dashboard from "./pages/Dashboard";
import StudentFiles from "./pages/StudentFiles";
import FetchResult from "./pages/FetchResult";
import FetchStatus from "./pages/FetchStatus";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student-files" element={<StudentFiles />} />
        <Route path="/fetch-result" element={<FetchResult />} />
        <Route path="/fetch-status" element={<FetchStatus />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
