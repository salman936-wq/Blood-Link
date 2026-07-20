import Table from "@/components/common/Table";
import StatusBadge from "@/components/common/StatusBadge";
import AddFund from "./AddFund";
import { getSessionInServer } from "@/lib/api/core/session";
import { getPersonalPaymentHistory } from "@/lib/api/extra/getPaymentInfo";

export default async function DonorFundingPage() {
  const columns = [
  {
    key: "donor",
    label: "Donor",
  },
  {
    key: "amount",
    label: "Amount",
  },
  {
    key: "paymentIntentId",
    label: "Transaction",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "createdAt",
    label: "Date",
  },
];

  const user = await getSessionInServer()
  const payments = await getPersonalPaymentHistory(user?.email)
  

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">
        <h3 className="font-display text-lg font-semibold text-gray-900 mb-4">My contributions</h3>
        <AddFund email={user?.email}/>
      </div>

      <div>
        <Table
          columns={columns}
          data={payments}
          user={user}
          renderCell={(key, row) => key === "status" ? <StatusBadge status={row.status} /> : row[key]}
        />
      </div>
    </div>
  );
}
