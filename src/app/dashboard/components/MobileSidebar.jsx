"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as Icons from "lucide-react";
import { Droplet, LogOut, X } from "lucide-react";
import { getMenus } from "@/lib/data";
import { authClient } from "@/lib/auth-client";

// Mobile drawer variant of Sidebar — same menu data, slide-in presentation.
export default function MobileSidebar({ role = "donor", open, onClose }) {
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
    <div className={`lg:hidden fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-gray-900/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside className={`absolute left-0 top-0 h-full w-72 bg-white shadow-xl transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-6 h-20 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
              <Droplet className="h-[18px] w-[18px]" fill="white" strokeWidth={0} />
            </span>
            <span className="font-display text-lg font-bold text-gray-900">Blood<span className="text-primary">Link</span></span>
          </Link>
          <button className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
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
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        active ? "bg-primary text-white shadow-md" : "text-gray-600 hover:bg-red-50 hover:text-primary"
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
    </div>
  );
}
