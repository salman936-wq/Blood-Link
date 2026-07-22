import { authClient } from "@/lib/auth-client";

export const getUserToken = async () => {
  const {data} = await authClient.getSession();
  
  return data?.session?.token || null;
}