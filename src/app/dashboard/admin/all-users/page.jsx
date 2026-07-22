import { Plus } from "lucide-react";
import Link from "next/link";

import EmptyState from "@/components/common/EmptyState";
import Button from "@/components/common/Button";
import { getAdminUsersWithFilter } from "@/lib/api/getDatas/getBlodDonetion";
import PaginationBlodReq from "./paginationMyrequest";
import { getSessionInServer } from "@/lib/api/core/session";
import FilterMyRequest from "./FilterMyRquest";
import UsersTable from "./UsersTable";

export default async function MyDonationRequestsPage({ searchParams }) {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();
  const {id, role} = await getSessionInServer();

  const { datas, totalPage, total } = await getAdminUsersWithFilter(queryString);
  const hasRequests = datas.length > 0;


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{total} requests youve created</p>
        <div className="flex items-center gap-4">
          <FilterMyRequest />
        </div>
      </div>

      {hasRequests ? (
        <>
          <UsersTable userRole={role} users={datas} />
          {!totalPage < 1 && <PaginationBlodReq totalPages={totalPage} />} </>
      ) : (
        <EmptyState
          icon="ClipboardList"
          title="No requests yet"
          desc="When you create a donation request, it will show up here so you can track its status."
          action={
            <Link href={`/dashboard/${role}/create-donation-request`}>
              <Button icon={Plus}>Create your first request</Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
