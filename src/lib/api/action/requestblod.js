const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const postAllDatas = async (path, data, method = "POST") => {

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Request failed");
  }

  return await res.json();
};

export const requestForBlood = async (data) => {
return postAllDatas("/api/donor/donation-request", data);
}

// export const editRequestBlood = async (path, data, method = "PATCH") => {
// return postAllDatas(path, data, method);
// }


