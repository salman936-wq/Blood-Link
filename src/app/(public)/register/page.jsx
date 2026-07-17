import Link from "next/link";
import RegisterForm from "./RegisterForm";
import {Droplet} from "lucide-react";
export default function RegisterPage() {



  return (
    <section className="min-h-[calc(100vh-80px)] grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-12 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-500 mb-8">Join the network — youll only be contacted for matching requests.</p>

          

          <RegisterForm/>



          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">Log in</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-col justify-between bg-gray-900 text-white p-12 relative overflow-hidden order-1 lg:order-2">
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
            Register once. Be findable for years of donations to come.
          </h2>
          <p className="text-gray-400 max-w-sm">
            We only show your profile to verified requesters searching your exact blood group and district.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800&auto=format&fit=crop"
          alt="Donor mid-donation"
          className="relative rounded-2xl h-56 w-full object-cover shadow-xl"
        />
      </div>
    </section>
  );
}
