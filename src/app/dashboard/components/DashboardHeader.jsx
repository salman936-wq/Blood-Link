"use client";
import { Menu, Bell, Search } from "lucide-react";
import { getRoleTitle } from "@/lib/data";

// Single Header component. Title changes based on `role`.
export default function DashboardHeader({ role = "donor", subtitle, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 glass border-b border-gray-200">
      <div className="flex items-center justify-between h-20 px-6">
        <div className="flex items-center gap-3">
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-50 text-gray-600" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-display text-xl font-bold text-gray-900">{getRoleTitle(role)}</h1>
            {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 w-64">
            <Search className="h-4 w-4 text-gray-400" />
            <input placeholder="Search..." className="w-full bg-transparent text-sm focus:outline-none" />
          </div>
          <button className="relative p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
          </button>
          <img src="https://i.pravatar.cc/80?img=12" alt="User avatar" className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm" />
        </div>
      </div>
    </header>
  );
}
