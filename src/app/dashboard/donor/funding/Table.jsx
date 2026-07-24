export default function Table({
  columns = [],
  data = [],
  user,
}) {
  if (!data.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white py-12 text-center">
        <p className="text-gray-500">No data found.</p>
      </div>
    );
  }

  const defaultRenderCell = (key, row) => {
    switch (key) {
      case "donor":
        return (
          <div className="flex items-center gap-4">
            <img
              src={user?.image}
              alt={user?.name}
              className="h-14 w-14 rounded-full border-2 border-red-100 object-cover"
            />

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-gray-900">
                  {user?.name}
                </h3>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    user?.activeStutus
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user?.activeStutus ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="text-sm text-gray-500">
                {user?.email}
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-red-50 px-2 py-1 font-medium text-red-600">
                  🩸 {user?.bloodGroup}
                </span>

                <span className="rounded bg-blue-50 px-2 py-1 text-blue-700">
                  📍 {user?.district}, {user?.division}
                </span>

                <span className="rounded bg-gray-100 px-2 py-1 capitalize text-gray-700">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
        );

      case "amount":
        return (
          <div>
            <h3 className="text-xl font-bold text-green-600">
              ৳ {row.amount}
            </h3>

            <p className="text-xs text-gray-500">
              Donation Amount
            </p>
          </div>
        );

      case "paymentIntentId":
        return (
          <div className="max-w-[220px]">
            <code className="block rounded-lg bg-gray-100 px-3 py-2 text-xs break-all text-gray-700">
              {row.paymentIntentId}
            </code>
          </div>
        );

      case "status":
        return (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
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
            <p className="font-medium text-gray-800">
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
          <thead className="border-b bg-gray-50">
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
                className="border-b border-gray-100 transition duration-200 hover:bg-gray-50"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-6 py-5 align-middle ${
                      col.className || ""
                    }`}
                  >
                    {defaultRenderCell(col.key, row)}
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