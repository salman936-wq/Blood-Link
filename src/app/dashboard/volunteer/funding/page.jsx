import { HandCoins } from "lucide-react";
import Button from "@/components/common/Button";
import { campaigns } from "@/lib/data";

export default function VolunteerFundingPage() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">Track and help promote active funding campaigns in your district.</p>
      <div className="grid sm:grid-cols-3 gap-5">
        {campaigns.map((c) => {
          const pct = Math.round((c.raised / c.goal) * 100);
          return (
            <div key={c.id} className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 overflow-hidden flex flex-col">
              <img src={c.image} alt={c.title} className="h-32 w-full object-cover" />
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display font-semibold text-gray-900 mb-3 text-sm">{c.title}</h3>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-2">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-gray-400 mb-4">{c.supporters.toLocaleString()} supporters · {pct}% funded</p>
                <Button variant="secondary" icon={HandCoins} className="mt-auto w-full">Share campaign</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
