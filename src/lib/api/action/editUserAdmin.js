import { authHeader } from "./authHeader";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;


// Update user (PUT) request for user
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