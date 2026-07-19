import { Sparkles, Droplet, CheckCircle2, Clock, XCircle } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import RequestTable from "@/components/dashboard/RequestTable";
import { getBlodDonetionByIdWithFilter } from "@/lib/api/getDatas/getBlodDonetion";
import { getSessionInServer } from "@/lib/api/core/session";

// ---- Helpers: dashboard state derived from real donation-request data ----

function buildStats(datas, total) {
  const completed = datas.filter((d) => d.status === "Completed").length;
  const pending = datas.filter((d) => d.status === "Pending").length;
  const cancelled = datas.filter((d) => d.status === "Cancelled").length;

  return [
    { label: "Total requests", value: total ?? datas.length, icon: Droplet },
    { label: "Pending", value: pending, icon: Clock },
    { label: "Completed", value: completed, icon: CheckCircle2 },
    { label: "Cancelled", value: cancelled, icon: XCircle },
  ];
}

function buildActivityTimeline(datas) {
  return [...datas]
    .sort((a, b) => new Date(b.requiredDateTime) - new Date(a.requiredDateTime))
    .slice(0, 5)
    .map((d) => ({
      id: d._id,
      text: `${d.bloodGroup} request for ${d.patientName} at ${d.hospitalName} is ${d.status}`,
      time: new Date(d.requiredDateTime).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
}

function buildNotifications(datas) {
  return datas
    .filter((d) => d.status === "Pending" || d.urgency?.includes("Critical"))
    .slice(0, 5)
    .map((d) => ({
      id: d._id,
      text:
        d.status === "Pending"
          ? `${d.urgency ?? "Request"} — ${d.unitsNeeded} unit(s) of ${d.bloodGroup} needed at ${d.hospitalName}`
          : `Donation for ${d.patientName} marked as ${d.status}`,
      time: new Date(d.requiredDateTime).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      }),
    }));
}

export default async function DonorOverviewPage() {
  let datas = [];
  let total = 0;
  let error = null;
const {id} = await getSessionInServer();

  try {
    const queryString = "";
    const res = await getBlodDonetionByIdWithFilter(queryString, id);
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

  const stats = buildStats(datas, total);
  const recentRequests = datas.slice(0, 3);
  const activityTimeline = buildActivityTimeline(datas);
  const notifications = buildNotifications(datas);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 space-y-6">

          <div>
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">
              My recent requests
            </h3>
            {recentRequests.length > 0 ? (
              <RequestTable data={recentRequests} />
            ) : (
              <p className="text-sm text-gray-400">
                You haven&apos;t made any blood requests yet.
              </p>
            )}
          </div>
        </div>

        <div className="col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-stretch">
  <div className="h-full rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6">
    <h3 className="font-display text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
      <Sparkles className="h-[18px] w-[18px] text-primary" /> Activity timeline
    </h3>

    <div className="space-y-5">
      {activityTimeline.length > 0 ? (
        activityTimeline.map((a) => (
          <div key={a.id} className="flex items-start gap-3">
            <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
            <div>
              <p className="text-sm text-gray-700">{a.text}</p>
              <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400">No recent activity yet.</p>
      )}
    </div>
  </div>

  <div className="h-full rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6">
    <h3 className="font-display text-lg font-semibold text-gray-900 mb-5">
      Notifications
    </h3>

    <div className="space-y-4">
      {notifications.length > 0 ? (
        notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
          >
            <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
            <div>
              <p className="text-sm text-gray-700">{n.text}</p>
              <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400">No new notifications.</p>
      )}
    </div>
  </div>
</div>
      </div>
    </div>
  );
}