import StatCard from "@/components/dashboard/StatCard";
import Table from "@/components/common/Table";
import { campaigns } from "@/lib/data";

const fundingStats = [
  { label: "Total raised", value: "৳12.1L", icon: "HandCoins", trend: "across all campaigns", tone: "primary" },
  { label: "Active campaigns", value: "3", icon: "Megaphone", trend: "1 nearing goal", tone: "info" },
  { label: "Supporters", value: "2,356", icon: "Users", trend: "+128 this month", tone: "success" },
  { label: "Avg. contribution", value: "৳513", icon: "TrendingUp", trend: "this quarter", tone: "warning" },
];

export default function AdminFundingPage() {
  const columns = [
    { key: "title", label: "Campaign" },
    { key: "progress", label: "Progress" },
    { key: "supporters", label: "Supporters" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {fundingStats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <Table
        columns={columns}
        data={campaigns}
        renderCell={(key, row) => {
          if (key === "title") return <span className="font-medium text-gray-900">{row.title}</span>;
          if (key === "progress") {
            const pct = Math.round((row.raised / row.goal) * 100);
            return (
              <div className="w-48">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>৳{row.raised.toLocaleString()}</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          }
          if (key === "supporters") return row.supporters.toLocaleString();
          return row[key];
        }}
      />
    </div>
  );
}
