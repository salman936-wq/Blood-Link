import { Sparkles } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ChartCard from "@/components/dashboard/ChartCard";
import RequestTable from "@/components/dashboard/RequestTable";
import { dashboardStats, myRequests, activityTimeline, notifications } from "@/lib/data";

export default function DonorOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartCard />
          <div>
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">My recent requests</h3>
            <RequestTable data={myRequests} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <Sparkles className="h-[18px] w-[18px] text-primary" /> Activity timeline
            </h3>
            <div className="space-y-5">
              {activityTimeline.map((a) => (
                <div key={a.id} className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">{a.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 p-6">
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-5">Notifications</h3>
            <div className="space-y-4">
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">{n.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
