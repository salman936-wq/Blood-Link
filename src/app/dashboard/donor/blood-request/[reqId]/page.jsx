import { fetchDataById } from "@/lib/api/core/fetchData";
import BloodRequestClient from "./BloodRequestClient";
import { getSessionInServer } from "@/lib/api/core/session";


export const metadata = {
  title: "Request Details | Blood Request",
  description: "View urgency, location, and requirements for a blood request.",
};



export default async function BloodRequestPage({params}) {
const {reqId} = await params;

  const request = await fetchDataById("/api/donor/blood-request", reqId);
  const userInfo = await getSessionInServer();
  

  return (
    <main className="min-h-screen bg-base-200/50">
      <BloodRequestClient data={request} id={userInfo.id} name={userInfo.name} phone={userInfo.phone}/>
    </main>
  );
}