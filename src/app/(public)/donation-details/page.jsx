import Link from "next/link";
import { MapPin, Clock, Droplet, Phone, User, ArrowLeft } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { urgentRequests } from "@/lib/data";

// Design-only static detail page. In production this would read the
// request id from the URL (e.g. donation-details/[id]) and fetch that record.
export default function DonationDetailsPage() {
  const request = urgentRequests[0];

  return (
    <section className="section bg-white">
      <div className="container-app max-w-4xl">
        <Link href="/donation-requests" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to all requests
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white font-display font-bold text-xl">
                {request.bloodGroup}
              </span>
              <div>
                <h1 className="font-display text-2xl font-bold text-gray-900">{request.patient}</h1>
                <p className="text-sm text-gray-500">{request.hospital}</p>
              </div>
            </div>
            <StatusBadge status={request.urgency} />
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              { icon: MapPin, label: "District", value: request.district },
              { icon: Clock, label: "Needed by", value: request.date },
              { icon: Droplet, label: "Units needed", value: `${request.unitsNeeded} units` },
            ].map((f) => (
              <div key={f.label} className="rounded-xl border border-gray-100 bg-gray-50/60 p-5">
                <f.icon className="h-[18px] w-[18px] text-primary mb-3" />
                <p className="text-xs text-gray-400 mb-1">{f.label}</p>
                <p className="font-semibold text-gray-900 text-sm">{f.value}</p>
              </div>
            ))}
          </div>

          <div className="mb-10">
            <h3 className="font-display font-semibold text-gray-900 mb-3">Additional context</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Patient is scheduled for a procedure and requires a matching donor as a precaution.
              Ward staff can confirm exact timing on arrival.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-gray-100 p-5 bg-gray-50/40 mb-10">
            <img src="https://i.pravatar.cc/100?img=8" alt="Requester" className="h-12 w-12 rounded-full object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Requested by Jahid Hossain</p>
              <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-1"><Phone className="h-3.5 w-3.5" /> +880 1XXXXXXXXX</p>
            </div>
          </div>

          <button className="btn w-full sm:w-auto rounded-xl bg-primary hover:bg-red-700 text-white border-none shadow-md h-12 px-8">
            Respond to this request
          </button>
        </div>
      </div>
    </section>
  );
}
