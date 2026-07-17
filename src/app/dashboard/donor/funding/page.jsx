import { HandCoins } from "lucide-react";
import Table from "@/components/common/Table";
import StatusBadge from "@/components/common/StatusBadge";
import Button from "@/components/common/Button";
import { myFunding, campaigns } from "@/lib/data";

export default function DonorFundingPage() {
  const columns = [
    { key: "id", label: "Reference" },
    { key: "campaign", label: "Campaign" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-3 gap-5">
        {campaigns.map((c) => {
          const pct = Math.round((c.raised / c.goal) * 100);
          return (
            <div key={c.id} className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-100/60 overflow-hidden flex flex-col">
              <img src={c.image} alt={c.title} className="h-32 w-full object-cover" />
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display font-semibold text-gray-900 mb-3 text-sm">{c.title}</h3>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-2">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-gray-400 mb-4">৳{c.raised.toLocaleString()} raised of ৳{c.goal.toLocaleString()}</p>
                <Button variant="secondary" icon={HandCoins} className="mt-auto w-full">Contribute</Button>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">My contributions</h3>
        <Table
          columns={columns}
          data={myFunding}
          renderCell={(key, row) => key === "status" ? <StatusBadge status={row.status} /> : row[key]}
        />
      </div>
    </div>
  );
}
