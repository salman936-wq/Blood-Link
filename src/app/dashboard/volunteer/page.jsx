import StatCard from "@/components/dashboard/StatCard";
import { volunteerStats, volunteerTasks, urgentRequests } from "@/lib/data";
import BloodCard from "@/components/public/BloodCard";
import { getSessionInServer } from "@/lib/api/core/session";

import { getAdminBlodDonetionWithFilter, getAllPendingBlodRequest } from "@/lib/api/getDatas/getBlodDonetion";
import RequestTable from "../admin/all-blood-donation-request/RequestTable";

export default async function VolunteerOverviewPage() {
  let datas = [];
  let total = 0;
  let error = null;
  const queryString = "";
  const { datas: card } = await getAllPendingBlodRequest(queryString)
  const columns = [
    { key: "id", label: "Task" },
    { key: "task", label: "Description" },
    { key: "district", label: "District" },
    { key: "due", label: "Due" },
    { key: "status", label: "Status" },
  ];

  try {

    const res = await getAdminBlodDonetionWithFilter(queryString);
    datas = res?.datas ?? [];
    total = res?.total ?? datas.length;
  } catch (err) {
    error = "Failed to load your donation data. Please try again later.";
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
        {error}
      </div>
    );
  }


  const { role } = await getSessionInServer()

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {volunteerStats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Assign tasks</h3>
        {datas.length > 0 ? (
          <RequestTable userRole={role} data={datas} />
        ) : (
          <p className="text-sm text-gray-400">
            You haven&apos;t made any blood requests yet.
          </p>
        )}
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Urgent requests nearby</h3>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {card.map((r) => <BloodCard key={r._id} userRole={role} request={r} />)}
        </div>
      </div>
    </div>
  );
}
