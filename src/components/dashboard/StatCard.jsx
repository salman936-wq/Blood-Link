import * as Icons from "lucide-react";

const tones = {
  primary: "bg-red-50 text-primary",
  success: "bg-green-50 text-green-600",
  warning: "bg-amber-50 text-amber-600",
  info: "bg-blue-50 text-blue-600",
};

export default function StatCard({ label, value, icon, trend, tone = "primary" }) {
  const Icon = Icons[icon] || Icons.Activity;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="font-display text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
      {trend && <p className="text-xs text-gray-400 mt-2">{trend}</p>}
    </div>
  );
}
