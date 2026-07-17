export default function Textarea({
  label,
  error,
  rows = 4,
  className = "",
  ...props
}) {
  return (
    <label className="form-control w-full">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </span>
      )}

      <div
        className={`rounded-xl border px-3.5 py-3 transition-colors focus-within:border-primary ${
          error ? "border-red-400" : "border-gray-200"
        } ${className}`}
      >
        <textarea
          rows={rows}
          className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-gray-400"
          {...props}
        />
      </div>

      {error && (
        <span className="mt-1.5 text-xs text-primary">
          {error}
        </span>
      )}
    </label>
  );
}