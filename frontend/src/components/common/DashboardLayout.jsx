import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const SIDEBAR_STORAGE_KEY = "scholarstats.sidebar.collapsed";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/student-files": "Student Files",
  "/fetch-result": "Fetch Result",
  "/fetch-status": "Fetch Status",
  "/result-files": "Result Files",
  "/semester-analysis": "Semester Analysis",
  "/reports": "Reports",
};

function getSavedSidebarState() {
  try {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true";
  } catch (error) {
    console.error("Unable to read sidebar preference:", error);
    return false;
  }
}

function DashboardLayout() {
  const location = useLocation();

  const [isSidebarCollapsed, setIsSidebarCollapsed] =
    useState(getSavedSidebarState);
  const pageTitle = PAGE_TITLES[location.pathname] || "ScholarStats";

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(isSidebarCollapsed));
    } catch (error) {
      console.error("Unable to save sidebar preference:", error);
    }
  }, [isSidebarCollapsed]);

  // Synchronize sidebar preference between multiple browser tabs.
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === SIDEBAR_STORAGE_KEY) {
        setIsSidebarCollapsed(event.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((previous) => !previous);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-biryani text-gray-900">
      <div className="flex min-h-screen">
        <Sidebar isSidebarCollapsed={isSidebarCollapsed} />

        <main className="flex min-w-0 flex-1 flex-col">
          <Navbar title={pageTitle} onToggleSidebar={handleToggleSidebar} />

          <section className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
