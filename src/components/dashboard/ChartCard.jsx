import { chartMonthly } from "@/lib/data";

export default function ChartCard() {
  const max = Math.max(...chartMonthly.map((d) => d.units));
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-display text-lg font-semibold text-gray-900">Donations by month</h3>
          <p className="text-sm text-gray-400">Last 6 months, in units</p>
        </div>
      </div>
      <div className="flex items-end justify-between gap-3 h-48">
        {chartMonthly.map((d) => (
          <div key={d.month} className="flex flex-col items-center gap-2 flex-1">
            <div
              className="w-full rounded-t-lg bg-gradient-to-t from-primary to-red-400 transition-all duration-500 hover:opacity-80"
              style={{ height: `${(d.units / max) * 100}%` }}
              title={`${d.units} units`}
            />
            <span className="text-xs text-gray-400">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
