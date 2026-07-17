import BloodCard from "@/components/public/BloodCard";
import SectionTitle from "@/components/common/SectionTitle";
import { Filter } from "lucide-react";
import { urgentRequests } from "@/lib/data";

export default function DonationRequestsPage() {
  return (
    <section className="section bg-white my-10">
      <div className="container-app">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionTitle
            eyebrow="Live requests"
            title="Donation requests"
            desc="Every request here is verified and updated in real time."
            align="left"
          />
          <button className="btn btn-outline rounded-xl border-gray-300 text-gray-600 gap-2 mb-16 shrink-0">
            <Filter className="h-4 w-4" /> Filter
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 -mt-10">
          {urgentRequests.map((r) => <BloodCard key={r.id} request={r} />)}
        </div>
      </div>
    </section>
  );
}
