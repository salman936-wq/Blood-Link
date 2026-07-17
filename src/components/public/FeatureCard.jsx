import * as Icons from "lucide-react";

export default function FeatureCard({ icon, title, desc }) {
  const Icon = Icons[icon] || Icons.HeartPulse;
  return (
    <div className="group h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg shadow-gray-100/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/30">
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
        <Icon className="h-6 w-6" strokeWidth={2} />
      </div>
      <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-[15px]">{desc}</p>
    </div>
  );
}
