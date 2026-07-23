import { authHeaderInServer } from "../verifyServer/serverAuthHeader";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const updateBloodRequest = async (id, data) => {
  const res = await fetch(`${baseUrl}/api/dashboard/donor/request/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ... await authHeaderInServer()
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};