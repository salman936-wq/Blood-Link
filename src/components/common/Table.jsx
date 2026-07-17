export default function Table({ columns = [], data = [], renderCell }) {
  if (!data.length) return null;
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60">
      <table className="table w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((col) => (
              <th key={col.key} className="text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-50/60 py-4 px-6">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id ?? i} className="border-b border-gray-100 last:border-0 hover:bg-red-50/30 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="py-4 px-6 text-sm text-gray-700">
                  {renderCell ? renderCell(col.key, row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
