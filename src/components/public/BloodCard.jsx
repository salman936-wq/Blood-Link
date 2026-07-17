import { MapPin, Clock, Droplet } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

export default function BloodCard({ request }) {
  const { patient, bloodGroup, hospital, district, unitsNeeded, urgency, date } = request;
  return (
    <div className="h-full flex flex-col rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-primary text-white font-display font-bold text-lg shrink-0">
          {bloodGroup}
        </div>
        <StatusBadge status={urgency} />
      </div>
      <h3 className="font-display text-lg font-semibold text-gray-900 mb-1">{patient}</h3>
      <p className="text-sm text-gray-500 mb-5">{hospital}</p>
      <div className="mt-auto space-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary shrink-0" /><span>{district}</span></div>
        <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary shrink-0" /><span>{date}</span></div>
        <div className="flex items-center gap-2"><Droplet className="h-4 w-4 text-primary shrink-0" /><span>{unitsNeeded} unit{unitsNeeded > 1 ? "s" : ""} needed</span></div>
      </div>
      <button className="btn mt-6 w-full rounded-xl bg-primary hover:bg-red-700 text-white border-none shadow-md">
        Respond to request
      </button>
    </div>
  );
}
