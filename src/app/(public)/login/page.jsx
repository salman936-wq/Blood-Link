import Link from "next/link";
import { Mail, Lock, Droplet } from "lucide-react";

export default function LoginPage() {
  return (
    <section className="min-h-[calc(100vh-80px)] grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-gray-900 text-white p-12 relative overflow-hidden">
        <svg className="absolute inset-x-0 top-1/3 w-[1000px] max-w-none opacity-10 pointer-events-none" viewBox="0 0 1000 200">
          <path d="M0 100 L350 100 L400 40 L450 160 L500 100 L1000 100" fill="none" stroke="white" strokeWidth="3" />
        </svg>
        <Link href="/" className="flex items-center gap-2 relative">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <Droplet className="h-5 w-5" fill="white" strokeWidth={0} />
          </span>
          <span className="font-display text-xl font-bold">Blood<span className="text-red-400">Link</span></span>
        </Link>
        <div className="relative">
          <h2 className="font-display text-4xl font-bold leading-tight mb-4">
            Every login brings one more life-saving match closer.
          </h2>
          <p className="text-gray-400 max-w-sm">
            Track your donation history, manage requests and stay ready for the next call.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop"
          alt="Medical professional preparing a donation kit"
          className="relative rounded-2xl h-56 w-full object-cover shadow-xl"
        />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-8">Log in to your BloodLink account.</p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <label className="form-control w-full">
              <span className="text-sm font-medium text-gray-700 mb-1.5 block">Email address</span>
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-3 focus-within:border-primary transition-colors">
                <Mail className="h-4 w-4 text-gray-400" />
                <input type="email" placeholder="you@example.com" className="w-full bg-transparent text-sm focus:outline-none" />
              </div>
            </label>
            <label className="form-control w-full">
              <span className="text-sm font-medium text-gray-700 mb-1.5 block">Password</span>
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-3 focus-within:border-primary transition-colors">
                <Lock className="h-4 w-4 text-gray-400" />
                <input type="password" placeholder="••••••••" className="w-full bg-transparent text-sm focus:outline-none" />
              </div>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="checkbox checkbox-sm rounded [--chkbg:theme(colors.primary)]" />
                Remember me
              </label>
              <a href="#" className="font-medium text-primary hover:underline">Forgot password?</a>
            </div>

            <button type="submit" className="btn w-full rounded-xl bg-primary hover:bg-red-700 text-white border-none shadow-md h-12">
              Log in
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
