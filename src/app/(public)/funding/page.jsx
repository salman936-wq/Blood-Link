import SectionTitle from "@/components/common/SectionTitle";
import { HandCoins } from "lucide-react";
import { campaigns } from "@/lib/data";

export default function FundingPage() {
  return (
    <section className="section bg-white my-10">
      <div className="container-app">
        <SectionTitle eyebrow="Support the mission" title="Fund a campaign" desc="Your contribution funds mobile donation camps, screening kits and patient support." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c) => {
            const pct = Math.round((c.raised / c.goal) * 100);
            return (
              <div key={c.id} className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <img src={c.image} alt={c.title} className="h-44 w-full object-cover" />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">{c.title}</h3>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-2">
                    <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mb-6">
                    <span>৳{c.raised.toLocaleString()} raised</span>
                    <span>{pct}% of ৳{c.goal.toLocaleString()}</span>
                  </div>
                  <button className="btn mt-auto w-full rounded-xl bg-primary hover:bg-red-700 text-white border-none shadow-md gap-2">
                    <HandCoins className="h-4 w-4" /> Contribute now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
