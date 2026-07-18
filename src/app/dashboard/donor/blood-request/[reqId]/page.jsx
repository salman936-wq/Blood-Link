import { fetchDataById } from "@/lib/api/core/fetchData";
import BloodRequestClient from "./BloodRequestClient";
import { getSessionInServer } from "@/lib/api/core/session";


export const metadata = {
  title: "Request Details | Blood Request",
  description: "View urgency, location, and requirements for a blood request.",
};

// In a real app, fetch this from your DB / API using params or searchParams.
async function getBloodRequest() {
  return {
    id: "req_1",
    recipientName: "Mahbub Vai",
    recipientType: "Recipient • Patient",
    bloodGroup: "A+",
    hospitalName: "OMG Medical Collage",
    hospitalArea: "Osmaninagar, Sylhet",
    fullAddress: "OMG Medical Collage, Sylhet",
    requiredDate: "2025-12-21",
    requiredTime: "22:30",
    message: "Blood needed urgently, please help if you can donate.",
    status: "pending",
  };
}

export default async function BloodRequestPage({params}) {
const {reqId} = await params;

  const request = await fetchDataById("/api/donor/blood-request", reqId);
  const {id, name} = await getSessionInServer();
  

  return (
    <main className="min-h-screen bg-base-200/50">
      <BloodRequestClient data={request} id={id} name={name}/>
    </main>
  );
}