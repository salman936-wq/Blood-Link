"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as Icons from "lucide-react";
import { Droplet, LogOut } from "lucide-react";
import { getMenus } from "@/lib/data";
import { authClient } from "@/lib/auth-client";

// Single Sidebar component. Menu items change based on `role`, not the component itself.
export default function Sidebar({ role = "donor" }) {
  const pathname = usePathname();
  const menus = getMenus(role);
  const router = useRouter()

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  }

  return (
    <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-gray-200 h-screen sticky top-0 bg-white">
      <div className="flex items-center gap-2 px-6 h-20 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
            <Droplet className="h-[18px] w-[18px]" fill="white" strokeWidth={0} />
          </span>
          <span className="font-display text-lg font-bold text-gray-900">Blood<span className="text-primary">Link</span></span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {menus.map((group, i) => (
          <div key={i}>
            {group.section && (
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">{group.section}</p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = Icons[item.icon] || Icons.Circle;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-primary text-white shadow-md" : "text-gray-600 hover:bg-red-50 hover:text-primary"
                      }`}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link onClick={() => handleSignout()} href="/login" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-primary transition-colors">
          <LogOut className="h-[18px] w-[18px]" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
