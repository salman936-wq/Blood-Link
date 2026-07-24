import { getSessionInServer } from "@/lib/api/core/session";
import DonationReqForm from "./DonationReqForm";

export default async function CreateDonationRequestPage() {

  const user = await getSessionInServer();
  

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Create Donation Request
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Fill in the patients information so nearby matching donors can be
          notified immediately.
        </p>
      </div>

      <DonationReqForm donorId={user.id} donorRole={user?.role}/>


    </div>
  );
}