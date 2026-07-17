import Table from "@/components/common/Table";
import StatusBadge from "@/components/common/StatusBadge";

export default function RequestTable({ data, showDistrict = false, actions }) {
  const columns = [
    { key: "id", label: "Request ID" },
    { key: "patient", label: "Patient" },
    { key: "bloodGroup", label: "Group" },
    { key: "hospital", label: "Hospital" },
    ...(showDistrict ? [{ key: "district", label: "District" }] : []),
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
    ...(actions ? [{ key: "actions", label: "" }] : []),
  ];

  return (
    <Table
      columns={columns}
      data={data}
      renderCell={(key, row) => {
        if (key === "id") return <span className="font-semibold text-gray-900">{row.id}</span>;
        if (key === "bloodGroup") return (
          <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-red-50 text-primary text-xs font-bold">{row.bloodGroup}</span>
        );
        if (key === "status") return <StatusBadge status={row.status} />;
        if (key === "actions") return actions ? actions(row) : null;
        return row[key];
      }}
    />
  );
}
