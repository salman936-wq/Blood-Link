export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-100/60 animate-pulse">
      <div className="h-11 w-11 rounded-xl bg-gray-100 mb-4" />
      <div className="h-6 w-2/3 rounded bg-gray-100 mb-2" />
      <div className="h-4 w-1/2 rounded bg-gray-100" />
    </div>
  );
}

export function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 animate-pulse">
      <div className="h-10 w-10 rounded-full bg-gray-100 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-1/3 rounded bg-gray-100" />
        <div className="h-3 w-1/4 rounded bg-gray-100" />
      </div>
      <div className="h-6 w-16 rounded-full bg-gray-100" />
    </div>
  );
}

export default function LoadingSkeleton({ variant = "cards", count = 4 }) {
  if (variant === "rows") {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-100/60">
        {Array.from({ length: count }).map((_, i) => <RowSkeleton key={i} />)}
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}
