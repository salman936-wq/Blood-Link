import * as Icons from "lucide-react";

export default function EmptyState({ icon = "Inbox", title = "Nothing here yet", desc = "Once there's activity, it will show up here.", action }) {
  const Icon = Icons[icon] || Icons.Inbox;
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-primary mb-5">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="font-display text-lg font-semibold text-gray-900 mb-1.5">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{desc}</p>
      {action}
    </div>
  );
}
