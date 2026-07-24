import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import StatsCard from "./StatsCard";
import { siteStats } from "@/lib/data";

export default function Hero({user}) {


  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-32 sm:pt-24">
      <svg className="absolute inset-x-0 top-0 w-[1400px] max-w-none opacity-[0.06] pointer-events-none" viewBox="0 0 1400 300" aria-hidden="true">
        <path d="M0 150 L500 150 L560 60 L620 240 L680 150 L740 150 L780 90 L820 150 L1400 150" fill="none" stroke="#DC2626" strokeWidth="3" />
      </svg>

      <div className="container-app relative grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-heartbeat" />
            A donor is found every 4 minutes
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-[1.08] mb-6">
            Every heartbeat can wait for one more.
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-lg mb-10">
            BloodLink connects verified donors to patients across Bangladesh in minutes, not days.
            Search by blood group and district, or register to be found when it matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            {!user ? <Link href="/register" className="btn rounded-xl bg-primary hover:bg-red-700 text-white border-none shadow-lg gap-2 h-14 px-8">
              Become a donor <ArrowRight className="h-4 w-4" />
            </Link> : <Link href={`/dashboard/${user.role}`} className="btn rounded-xl bg-primary hover:bg-red-700 text-white border-none shadow-lg gap-2 h-14 px-8">
              Dashboard <ArrowRight className="h-4 w-4" />
            </Link>}
            <Link href="/donation-requests" className="btn btn-outline rounded-xl border-gray-300 hover:border-primary hover:bg-transparent hover:text-primary text-gray-700 gap-2 h-14 px-8">
              <PlayCircle className="h-4 w-4" /> View urgent requests
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[12, 32, 51, 45].map((n) => (
                <img key={n} src={`https://i.pravatar.cc/80?img=${n}`} alt="" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <p className="text-sm text-gray-500"><span className="font-semibold text-gray-900">12,904</span> donors already on board</p>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 animate-floatSlow">
            <img
              src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1200&auto=format&fit=crop"
              alt="Donor giving blood in a clinical setting"
              className="w-full h-[420px] object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-6 sm:-left-10 w-[220px]">
            <StatsCard label="Lives touched" value="3×" note="per single donation" />
          </div>
        </div>
      </div>

      <div className="container-app relative mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {siteStats.map((s) => <StatsCard key={s.label} {...s} />)}
      </div>
    </section>
  );
}
