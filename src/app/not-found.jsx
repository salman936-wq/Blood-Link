import Link from "next/link";
import { Droplet, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 text-center">
      <div className="max-w-md">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-primary mb-8 animate-heartbeat">
          <Droplet className="h-8 w-8" fill="currentColor" strokeWidth={0} />
        </span>
        <h1 className="font-display text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">This page flatlined</h2>
        <p className="text-gray-500 mb-10 leading-relaxed">
          The page you're looking for doesn't exist, or may have moved. Let's get you back to safety.
        </p>
        <Link href="/" className="btn rounded-xl bg-primary hover:bg-red-700 text-white border-none shadow-md gap-2 h-12 px-8">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </section>
  );
}
