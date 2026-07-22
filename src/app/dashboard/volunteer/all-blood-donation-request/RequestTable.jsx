"use client"

import StatusBadge from "@/components/common/StatusBadge";
import {
  EllipsisVertical,
  Eye,
  Pencil,
  XCircle,
  Trash2,
  Clock,
  Check,
} from "lucide-react";
import Link from "next/link";
import { deleteDonetionRequestForBlod, statusUpdaterForBloodRequest } from "@/lib/api/action/requestblod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Table from "./Table";

export default function RequestTable({
  data,
  userRole,
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



  const router = useRouter()


  const handleDeleteData = async (id) => {
    const res = await deleteDonetionRequestForBlod(id);

    if (res.success) {
      toast.success("Successfully deleted donetion request")
      router.push("/dashboard/donor/my-donation-requests")
    }
  }

  const handleCancelRequest = async (id) => {
    const data = {
      "status": "Cancelled"

    }
    const res = await statusUpdaterForBloodRequest(id, data);

    if (res.modifiedCount > 0) {
      toast.success("Status updated successfully");
      router.refresh(); // App Router
    }
  }

  const handleInprogressRequest = async (id) => {
    const data = {
      "status": "Inprogress"

    }
    const res = await statusUpdaterForBloodRequest(id, data);

    if (res.modifiedCount > 0) {
      toast.success("Status updated successfully");
      router.refresh(); // App Router
    }
  }

  const handleCompletedRequest = async (id) => {
    const data = {
      "status": "Completed"

    }
    const res = await statusUpdaterForBloodRequest(id, data);

    if (res.modifiedCount > 0) {
      toast.success("Status updated successfully");
      router.refresh(); // App Router
    }
  }

  const handlePendingRequest = async (id) => {
    const data = {
      "status": "Pending"

    }
    const res = await statusUpdaterForBloodRequest(id, data);

    if (res.modifiedCount > 0) {
      toast.success("Status updated successfully");
      router.refresh(); // App Router
    }
  }

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
                className={`badge ${row.urgency.includes("High")
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
                    <Link href={`/dashboard/${userRole}/blood-request/${row._id}`}>
                      <Eye size={16} />
                      View Details
                    </Link>
                  </li>

                  {/* Pending */}
                  {row.status === "Pending" && (
                    <>
                      <li>
                        <Link href={`/dashboard/${userRole}/edit-donation-request/${row._id}`}>
                          <Pencil size={16} />
                          Edit Request
                        </Link>
                      </li>

                      <li>
                        <button
                          className="text-error/60"
                          onClick={() => handleCancelRequest(row._id)}
                        >
                          <XCircle size={16} />
                          Cancel Request
                        </button>
                      </li>

                      


                      <li>
                        <button
                          className="text-success/60"
                          onClick={() => handleInprogressRequest(row._id)}
                        >
                          <Clock size={16} />
                          Inprogress Request
                        </button>
                      </li>

                      <li>
                        <button
                          className="text-success"
                          onClick={() => handleCompletedRequest(row._id)}
                        >
                          <Check size={16} />
                          Mark Completed
                        </button>
                      </li>

                      <li>
                        <button
                          className="text-error"
                          onClick={() => handleDeleteData(row._id)}
                        >
                          <Trash2 size={16} />
                          Delete Request
                        </button>
                      </li>
                    </>
                  )}

                  {/* In Progress */}
                  {row.status === "Inprogress" && (
                    <>
                    <li>
                      <button
                        className="text-error/60"
                        onClick={() => handleCancelRequest(row._id)}
                      >
                        <XCircle size={16} />
                        Cancel Request
                      </button>
                    </li>

                    <li>
                        <Link href={`/dashboard/${userRole}/edit-donation-request/${row._id}`}>
                          <Pencil size={16} />
                          Edit Request
                        </Link>
                      </li>

                    <li>
                        <button
                          className="text-warning"
                          onClick={() => handlePendingRequest(row._id)}
                        >
                          <Clock size={16} />
                          Pending Request
                        </button>
                      </li>
                      
                      <li>
                        <button
                          className="text-error"
                          onClick={() => handleDeleteData(row._id)}
                        >
                          <Trash2 size={16} />
                          Delete Request
                        </button>
                      </li>
                       </>

                  )}

                  {/* Completed / Cancelled */}
                  {(row.status === "Completed" ||
                    row.status === "Cancelled") && (
                      <li>
                        <button
                          className="text-error"
                          onClick={() => handleDeleteData(row._id)}
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