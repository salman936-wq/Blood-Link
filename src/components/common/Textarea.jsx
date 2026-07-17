export default function Textarea({ label, error, rows = 4, className = "", ...props }) {
  return (
    <label className="form-control w-full">
      {label && <span className="text-sm font-medium text-gray-700 mb-1.5 block">{label}</span>}
      <div
        className={`flex items-start gap-2 rounded-xl border px-3.5 py-3 transition-colors focus-within:border-primary ${
          error ? "border-red-400" : "border-gray-200"
        } ${className}`}
      >
        <textarea rows={rows} className="textarea w-full bg-transparent p-0 text-sm focus:outline-none resize-none" {...props} />
      </div>
      {error && <span className="text-xs text-primary mt-1.5">{error}</span>}
    </label>
  );
}
