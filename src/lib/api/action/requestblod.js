
import { authHeaderInServer } from "../verifyServer/serverAuthHeader";
import { postAllDatas } from "./requestblodClint";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;



// Create a new blood donetion request "POST"
export const requestForBlood = async (data) => {
return postAllDatas("/api/donor/donation-request", data);
}

// Change the blod request "PATCH"
export const acceptedRequestForBlod = async (id, data) => {
  const method = "PATCH";
  return postAllDatas(`/api/dashboard/donor/blood-request/${id}`, data, method);
}

// Delete donetion request by id
export const deleteDonetionRequestForBlod = async (id) => {
  const res = await fetch(`${baseUrl}/api/dashboard/donor/blood-request/${id}`, {
    headers: await authHeaderInServer(),
    method: "DELETE",
  });
    
  const data = await res.json();

  return data
}


// Status updater
export const statusUpdaterForBloodRequest = async (id, status) => {
  const res = await fetch(`${baseUrl}/api/dashboard/donor/status-request/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ... await authHeaderInServer()
      },
      body: JSON.stringify(status),
    }
  );

  return await res.json();
};


// Change personal details on profile page "PATCH"
export const profileUpdateChange = async (id, data) => {
  const method = "PATCH";
  return postAllDatas(`/api/profile/${id}`, data, method);
}

