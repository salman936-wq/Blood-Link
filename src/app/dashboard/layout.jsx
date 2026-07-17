"use client";
import { usePathname } from "next/navigation";
import DashboardShell from "./components/DashboardShell";

// Dashboard Layout — Sidebar + Header wrap every role page.
// The bare "/dashboard" route (role redirect stub) renders full-width, without the shell.
export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // ["dashboard", "admin", ...]
  const role = segments[1]; // "admin" | "donor" | "volunteer" | undefined

  if (!role) {
    return <div className="min-h-screen bg-gray-50/50">{children}</div>;
  }

  return <DashboardShell role={role}>{children}</DashboardShell>;
}
