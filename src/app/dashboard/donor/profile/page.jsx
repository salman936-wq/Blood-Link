import { getSessionInServer } from "@/lib/api/core/session";
import ProfileClint from "./ProfileClint";

export default async function DonorProfilePage() {
  const {image, id, name, email, district, phone, bloodGroup, division} = await getSessionInServer()

  return <ProfileClint image={image} id={id} name={name} email={email} district={district} phone={phone} bloodGroup={bloodGroup} division={division} />;
}