import { authHeaderInClient } from "../verifyServer/clientAuthHeader";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const postAllDatas = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeaderInClient()),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return res.json();
};