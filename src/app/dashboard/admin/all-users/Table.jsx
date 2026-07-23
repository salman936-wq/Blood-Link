"use client";


export default function Table({
  columns = [],
  data = [],
  user,
  renderCell,
}) {
  if (!data.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white py-12 text-center">
        <p className="text-gray-500">No data found.</p>
      </div>
    );
  }

  // Default Renderer
  const defaultRenderCell = (key, row) => {
    switch (key) {
      case "donor":
        return (
          <div className="flex items-center gap-3">
            <img
              src={user?.image}
              alt={user?.name}
              className="h-11 w-11 rounded-full border object-cover"
            />

            <div>
              <h3 className="font-semibold text-gray-800">
                {user?.name}
              </h3>

              <p className="text-sm text-gray-500">
                {user?.email}
              </p>
            </div>
          </div>
        );

      case "amount":
        return (
          <span className="text-lg font-bold text-green-600">
            ৳ {row.amount}
          </span>
        );

      case "paymentIntentId":
        return (
          <span className="rounded-lg bg-gray-100 px-3 py-1 font-mono text-xs text-gray-700">
            {row.paymentIntentId}
          </span>
        );

      case "status":
        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
              row.status === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {row.status}
          </span>
        );

      case "createdAt":
        return (
          <div>
            <p className="font-medium">
              {new Date(row.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>

            <p className="text-xs text-gray-500">
              {new Date(row.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        );

      default:
        return row[key];
    }
  };


  

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 ${
                    col.className || ""
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={row._id || index}
                className="border-t border-gray-100 transition hover:bg-gray-50"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-6 py-5 align-middle ${
                      col.className || ""
                    }`}
                  >
                    {renderCell
                      ? renderCell(col.key, row)
                      : defaultRenderCell(col.key, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}