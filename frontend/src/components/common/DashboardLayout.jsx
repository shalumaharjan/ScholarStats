import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function DashboardLayout({ title, subtitle, children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f7fb] font-biryani text-gray-900">
      <div className="flex min-h-screen">
        <Sidebar isSidebarCollapsed={isSidebarCollapsed} />

        <main className="flex min-w-0 flex-1 flex-col">
          <Navbar
            title={title}
            onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />

          <section className="flex-1 p-5 lg:p-8">{children}</section>

          {/* <Footer /> */}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
