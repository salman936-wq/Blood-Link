import { getSessionInServer } from "@/lib/api/core/session";
import DonationReqForm from "./DonationReqForm";
import { protectedFetchDataById } from "@/lib/api/core/fetchData";

export default async function CreateDonationRequestPage({params}) {
  const {id} = await params;
  const defaultValueOld = await protectedFetchDataById("/api/donor/blood-request", id);
  
  const user = await getSessionInServer();
  

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Edit Donation Request
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Edit information so nearby matching donors can be
          notified immediately.
        </p>
      </div>

      <DonationReqForm donorId={user.id} defaultValueOld={defaultValueOld}/>


    </div>
  );
}