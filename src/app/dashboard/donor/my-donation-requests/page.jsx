import { Plus } from "lucide-react";
import Link from "next/link";
import RequestTable from "@/components/dashboard/RequestTable";
import EmptyState from "@/components/common/EmptyState";
import Button from "@/components/common/Button";
import { myRequests } from "@/lib/data";

export default function MyDonationRequestsPage() {
  const hasRequests = myRequests.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{myRequests.length} requests you've created</p>
        <Link href="/dashboard/donor/create-donation-request">
          <Button icon={Plus}>New request</Button>
        </Link>
      </div>

      {hasRequests ? (
        <RequestTable data={myRequests} />
      ) : (
        <EmptyState
          icon="ClipboardList"
          title="No requests yet"
          desc="When you create a donation request, it will show up here so you can track its status."
          action={
            <Link href="/dashboard/donor/create-donation-request">
              <Button icon={Plus}>Create your first request</Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
