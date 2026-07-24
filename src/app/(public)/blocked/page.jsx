"use client";

import { LockKeyhole, ArrowLeft, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

export default function BlockedPage() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-6"
    >
      <div className="w-full max-w-md">
        {/* Caution stripe — signature element */}
        <div
          className="h-3 w-full rounded-t-2xl"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #f59e0b 0 14px, #0d0f16 14px 28px)",
          }}
        />

        <div className="card bg-[#161923] border border-[#262a38] rounded-t-none rounded-b-2xl shadow-2xl">
          <div className="card-body items-center text-center px-8 py-10">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
              <LockKeyhole className="w-7 h-7 text-amber-400" strokeWidth={2} />
            </div>

            {/* Status code, monospace for a "system log" feel */}
            <span className="badge badge-outline border-amber-500/40 text-amber-400 font-mono text-xs tracking-wider mb-4">
              ERR_403_BLOCKED
            </span>

            <h1 className="text-2xl font-bold text-slate-100 mb-2">
              Youre blocked
            </h1>

            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Access to this page has been restricted for your account.
              Reach out to support if you believe this isnt right.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link href="/" className="btn btn-primary flex-1 gap-2">
                <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
                Back to home
              </Link>
              <a href="/support" className="btn btn-outline flex-1 gap-2 text-slate-300 border-[#2c3140] hover:bg-[#1f2330] hover:border-[#2c3140]">
                <MessageCircleQuestion className="w-4 h-4" strokeWidth={2.5} />
                Contact support
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-[#4d5266] text-xs mt-5 font-mono">
          If this keeps happening, quote code 403 to support.
        </p>
      </div>
    </div>
  );
}