import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body items-center text-center">
          <CheckCircle2 className="w-20 h-20 text-primary" />

          <h1 className="text-3xl font-bold mt-4">
            Payment Successful!
          </h1>

          <p className="text-base-content/70">
            Thank you for your support. Your payment has been completed
            successfully.
          </p>

          <div className="w-full mt-6 space-y-3">
            <Link href="/" className="btn btn-primary w-full">
              Back to Home
            </Link>

            <Link href="/dashboard" className="btn btn-outline btn-primary w-full">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}