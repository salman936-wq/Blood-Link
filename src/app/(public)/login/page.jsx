import Link from "next/link";
import {Droplet } from "lucide-react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <section className="min-h-[calc(100vh-80px)] grid lg:grid-cols-2 mb-16 mt-6 md:mt-0 md:mb-32">
      {/* Left Side */}
      <div className="relative hidden lg:flex flex-col bg-gray-900 text-white p-12 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0">
          <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-red-500/10 blur-3xl"></div>

          <svg
            className="absolute inset-x-0 top-1/3 w-[1200px] max-w-none opacity-10"
            viewBox="0 0 1000 200"
          >
            <path
              d="M0 100 L350 100 L400 40 L450 160 L500 100 L1000 100"
              fill="none"
              stroke="white"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <Droplet className="h-6 w-6 text-white" fill="white" strokeWidth={0} />
          </span>

          <span className="text-2xl font-bold">
            Blood<span className="text-red-400">Link</span>
          </span>
        </Link>

        {/* Text */}
        <div className="relative z-10 mt-24 max-w-lg">
          <h1 className="text-5xl font-bold leading-tight">
            Every login brings one more life-saving match closer.
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Track your donation history, manage blood requests and stay
            connected with your community whenever someone needs help.
          </p>
        </div>

        {/* Image */}
        <div className="relative z-10 mt-auto">
          <img
            src="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop"
            alt="Blood Donation"
            className="h-64 w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-base-100 md:p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md rounded-3xl border border-base-200 bg-white md:p-8 md:shadow-2xl">



          <h2 className="text-3xl font-bold text-base-content">
            Welcome Back 👋
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Login to continue accessing your BloodLink account.
          </p>

          <LoginForm/>

          <p className="mt-8 text-center text-sm text-gray-500">
            Dont have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}