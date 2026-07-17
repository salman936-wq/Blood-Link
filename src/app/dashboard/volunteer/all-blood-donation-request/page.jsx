import { Filter } from "lucide-react";
import RequestTable from "@/components/dashboard/RequestTable";
import Button from "@/components/common/Button";
import { allRequests } from "@/lib/data";

export default function VolunteerAllRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-500">Requests you can help verify or coordinate</p>
        <Button variant="secondary" icon={Filter}>Filter by district</Button>
      </div>
      <RequestTable
        data={allRequests}
        showDistrict
        actions={() => (
          <div className="flex justify-end gap-2">
            <button className="text-xs font-semibold text-primary hover:underline">Verify</button>
          </div>
        )}
      />
    </div>
  );
}
