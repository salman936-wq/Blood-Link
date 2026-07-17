export default function StatsCard({ label, value, note }) {
  return (
    <div className="rounded-2xl bg-white/95 glass border border-gray-200 shadow-lg p-6 text-center sm:text-left">
      <p className="font-display text-3xl sm:text-4xl font-bold text-gray-900">{value}</p>
      <p className="text-sm font-semibold text-primary mt-1">{label}</p>
      {note && <p className="text-xs text-gray-400 mt-0.5">{note}</p>}
    </div>
  );
}
