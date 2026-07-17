import StatCard from "@/components/dashboard/StatCard";
import Table from "@/components/common/Table";
import StatusBadge from "@/components/common/StatusBadge";
import { volunteerStats, volunteerTasks, urgentRequests } from "@/lib/data";
import BloodCard from "@/components/public/BloodCard";

export default function VolunteerOverviewPage() {
  const columns = [
    { key: "id", label: "Task" },
    { key: "task", label: "Description" },
    { key: "district", label: "District" },
    { key: "due", label: "Due" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {volunteerStats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Assigned tasks</h3>
        <Table
          columns={columns}
          data={volunteerTasks}
          renderCell={(key, row) => key === "status" ? <StatusBadge status={row.status} /> : row[key]}
        />
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">Urgent requests nearby</h3>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {urgentRequests.slice(0, 3).map((r) => <BloodCard key={r.id} request={r} />)}
        </div>
      </div>
    </div>
  );
}
