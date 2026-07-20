import { HandCoins } from "lucide-react";
import Table from "@/components/common/Table";
import StatusBadge from "@/components/common/StatusBadge";
import Button from "@/components/common/Button";
import { myFunding, campaigns } from "@/lib/data";
import AddFund from "./AddFund";
import { getSessionInServer } from "@/lib/api/core/session";

export default async function DonorFundingPage() {
  const columns = [
    { key: "id", label: "Reference" },
    { key: "campaign", label: "Campaign" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  const user = await getSessionInServer()

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">
        <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">My contributions</h3>
        <AddFund email={user?.email}/>
      </div>

      <div>
        <Table
          columns={columns}
          data={myFunding}
          renderCell={(key, row) => key === "status" ? <StatusBadge status={row.status} /> : row[key]}
        />
      </div>
    </div>
  );
}
