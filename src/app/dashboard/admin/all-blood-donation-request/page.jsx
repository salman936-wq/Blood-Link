import { Filter, Download } from "lucide-react";
import RequestTable from "@/components/dashboard/RequestTable";
import Button from "@/components/common/Button";
import { allRequests } from "@/lib/data";

export default function AdminAllRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-500">{allRequests.length} total requests across all districts</p>
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={Filter}>Filter</Button>
          <Button variant="secondary" icon={Download}>Export</Button>
        </div>
      </div>
      <RequestTable
        data={allRequests}
        showDistrict
        actions={() => (
          <div className="flex justify-end gap-2">
            <button className="text-xs font-semibold text-primary hover:underline">View</button>
          </div>
        )}
      />
    </div>
  );
}
