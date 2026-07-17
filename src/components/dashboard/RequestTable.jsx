"use client"
import Table from "@/components/common/Table";
import StatusBadge from "@/components/common/StatusBadge";
import {
  EllipsisVertical,
  Eye,
  Pencil,
  XCircle,
  Trash2,
} from "lucide-react";

export default function RequestTable({
  data,
  showDistrict = false,
  onView,
  onEdit,
  onCancel,
  onDelete,
}) {
  const columns = [
    { key: "_id", label: "Request ID" },
    { key: "patientName", label: "Patient" },
    { key: "bloodGroup", label: "Blood" },
    { key: "hospitalName", label: "Hospital" },
    ...(showDistrict
      ? [
          { key: "district", label: "District" },
          { key: "division", label: "Division" },
        ]
      : []),
    { key: "unitsNeeded", label: "Units" },
    { key: "requiredDateTime", label: "Required" },
    { key: "urgency", label: "Urgency" },
    { key: "status", label: "Status" },
    { key: "actions", label: "" },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      renderCell={(key, row) => {
        switch (key) {
          case "_id":
            return (
              <span className="font-medium text-gray-700">
                #{row._id.slice(-6).toUpperCase()}
              </span>
            );

          case "patientName":
            return (
              <p className="font-semibold text-gray-900">
                {row.patientName}
              </p>
            );

          case "bloodGroup":
            return (
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
                {row.bloodGroup}
              </span>
            );

          case "hospitalName":
            return (
              <div className="max-w-[140px] truncate">
                {row.hospitalName}
              </div>
            );

          case "requiredDateTime":
            return (
              <span>
                {new Date(row.requiredDateTime).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            );

          case "unitsNeeded":
            return (
              <span className="font-semibold">
                {row.unitsNeeded} Unit
                {Number(row.unitsNeeded) > 1 ? "s" : ""}
              </span>
            );

          case "urgency":
            return (
              <span
                className={`badge ${
                  row.urgency.includes("High")
                    ? "badge-error"
                    : row.urgency.includes("Medium")
                    ? "badge-warning"
                    : "badge-success"
                }`}
              >
                {row.urgency}
              </span>
            );

          case "status":
            return <StatusBadge status={row.status} />;

          case "actions":
            return (
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="btn btn-ghost btn-circle btn-sm"
                >
                  <EllipsisVertical size={18} />
                </button>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu z-[100] w-56 rounded-box border bg-base-100 p-2 shadow-lg"
                >
                  {/* View */}
                  <li>
                    <button onClick={() => onView?.(row)}>
                      <Eye size={16} />
                      View Details
                    </button>
                  </li>

                  {/* Pending */}
                  {row.status === "Pending" && (
                    <>
                      <li>
                        <button onClick={() => onEdit?.(row)}>
                          <Pencil size={16} />
                          Edit Request
                        </button>
                      </li>

                      <li>
                        <button
                          className="text-warning"
                          onClick={() => onCancel?.(row)}
                        >
                          <XCircle size={16} />
                          Cancel Request
                        </button>
                      </li>
                    </>
                  )}

                  {/* In Progress */}
                  {row.status === "In Progress" && (
                    <li>
                      <button
                        className="text-warning"
                        onClick={() => onCancel?.(row)}
                      >
                        <XCircle size={16} />
                        Cancel Request
                      </button>
                    </li>
                  )}

                  {/* Completed / Cancelled */}
                  {(row.status === "Completed" ||
                    row.status === "Cancelled") && (
                    <li>
                      <button
                        className="text-error"
                        onClick={() => onDelete?.(row)}
                      >
                        <Trash2 size={16} />
                        Delete Request
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            );

          default:
            return row[key];
        }
      }}
    />
  );
}