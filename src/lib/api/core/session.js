import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getSessionInServer = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  return session?.user || null;
}