"use client"
import Link from "next/link";
import { CircleX } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body items-center text-center">
          <CircleX className="w-20 h-20 text-error" />

          <h1 className="text-3xl font-bold mt-4">
            Payment Cancelled
          </h1>

          <p className="text-base-content/70">
            Your payment was cancelled. No charge has been made.
          </p>

          <div className="w-full mt-6 space-y-3">
            <Link href="/" className="btn btn-primary w-full">
              Return Home
            </Link>

            <button
              onClick={() => history.back()}
              className="btn btn-outline btn-primary w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}