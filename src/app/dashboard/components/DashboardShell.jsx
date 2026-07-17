"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import DashboardHeader from "./DashboardHeader";

// Wraps every dashboard page: Sidebar + Header + content.
// `role` is derived from the URL segment by the layout (admin / donor / volunteer)
// and passed down so the single Sidebar/Header can render the right menu + title.
export default function DashboardShell({ role, subtitle, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar role={role} />
      <MobileSidebar role={role} open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <DashboardHeader role={role} subtitle={subtitle} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
