import { MapPin, Clock, Droplet, Building2, User } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import Link from "next/link";

export default function BloodCard({ request }) {
  const {
    patientName,
    bloodGroup,
    hospitalName,
    district,
    unitsNeeded,
    urgency,
    requiredDateTime,
  } = request;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">
          {bloodGroup}
        </div>

        <StatusBadge status={urgency} />
      </div>

      {/* Patient */}
      <div className="mb-5">
        <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <User className="h-5 w-5 text-primary" />
          {patientName}
        </h3>

        <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <Building2 className="h-4 w-4 text-primary" />
          {hospitalName}
        </p>
      </div>

      {/* Info */}
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{district}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span>
            {new Date(requiredDateTime).toLocaleString("en-BD", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Droplet className="h-4 w-4 text-primary" />
          <span>
            {unitsNeeded} Unit{Number(unitsNeeded) > 1 ? "s" : ""} Needed
          </span>
        </div>
      </div>

      <Link href={`${process.env.PUBLIC_URL}/dashboard/donor/blood-request/${request._id}`} className="btn mt-6 w-full rounded-xl border-none bg-primary text-white hover:bg-red-700">
        Respond to Request
      </Link>
    </div>
  );
}