import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  );
}

export default App;
