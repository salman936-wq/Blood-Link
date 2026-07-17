const styles = {
  Pending: "bg-amber-50 text-amber-600 border-amber-200",
  "In Progress": "bg-blue-50 text-blue-600 border-blue-200",
  Fulfilled: "bg-green-50 text-green-600 border-green-200",
  Completed: "bg-green-50 text-green-600 border-green-200",
  Cancelled: "bg-gray-50 text-gray-500 border-gray-200",
  Active: "bg-green-50 text-green-600 border-green-200",
  Blocked: "bg-red-50 text-primary border-red-200",
  Draft: "bg-amber-50 text-amber-600 border-amber-200",
  Published: "bg-green-50 text-green-600 border-green-200",
  Critical: "bg-red-50 text-primary border-red-200",
  High: "bg-amber-50 text-amber-600 border-amber-200",
  Standard: "bg-blue-50 text-blue-600 border-blue-200",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${styles[status] || "bg-gray-50 text-gray-500 border-gray-200"}`}>
      {status}
    </span>
  );
}
