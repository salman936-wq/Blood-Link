import { getUserToken } from "../core/clintSession";


const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {};
  return header;
}

export const updateUserRequest = async (id, data) => {
  const res = await fetch(`${baseUrl}/api/dashboard/admin/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ... await authHeader()
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};