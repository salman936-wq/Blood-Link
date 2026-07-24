"use client";
import { Menu, Bell, Search } from "lucide-react";
import { getRoleTitle } from "@/lib/data";
import { authClient } from "@/lib/auth-client";

// Single Header component. Title changes based on `role`.
export default function DashboardHeader({ role = "donor", subtitle, onMenuClick }) {
    const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-30 bg-white/95 glass border-b border-gray-200">
      <div className="flex items-center justify-between h-20 px-6">
        <div className="flex items-center gap-3">
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-50 text-gray-600" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </button>
          <div>
            {!isPending && session?.user && <h1 className="font-display text-xl font-bold text-gray-900">Welcome Back {session?.user?.name}</h1>}
          </div>
        </div>
{!isPending && session?.user && 
<div className="flex items-center gap-3">
          <img className="w-15 h-fit rounded-full" src={session?.user?.image} />
        </div>
}
        

      </div>
    </header>
  );
}
