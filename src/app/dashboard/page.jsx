import Link from "next/link";
import { ShieldCheck, HeartHandshake, Users2, Droplet, ArrowRight } from "lucide-react";

// In production this route would run inside middleware / a server component
// that reads the logged-in user's role and redirects:
//   admin     -> /dashboard/admin
//   donor     -> /dashboard/donor
//   volunteer -> /dashboard/volunteer
// Since auth isn't wired up yet, this is a design-only "continue as" picker
// so every dashboard variant stays reachable and previewable.

const roles = [
  {
    key: "donor",
    label: "Continue as Donor",
    desc: "Track your requests, respond to nearby matches and manage your profile.",
    icon: HeartHandshake,
    href: "/dashboard/donor",
  },
  {
    key: "volunteer",
    label: "Continue as Volunteer",
    desc: "Verify requests, coordinate pickups and support urgent cases in your area.",
    icon: Users2,
    href: "/dashboard/volunteer",
  },
  {
    key: "admin",
    label: "Continue as Admin",
    desc: "Oversee users, requests, funding campaigns and platform content.",
    icon: ShieldCheck,
    href: "/dashboard/admin",
  },
];

export default function DashboardRedirectPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg mb-5">
            <Droplet className="h-7 w-7" fill="white" strokeWidth={0} />
          </span>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500 max-w-md">
            Choose a workspace to preview. In the live app this happens automatically based on your account role.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {roles.map(({ key, label, desc, icon: Icon, href }) => (
            <Link
              key={key}
              href={href}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-primary mb-5 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-2">{label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">{desc}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Enter workspace <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
