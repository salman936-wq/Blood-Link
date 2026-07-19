
import { fetchData, fetchDataById } from "../core/fetchData";
import { getSessionInServer } from "../core/session";

const session = await getSessionInServer()

export const getBlodDonetionByIdWithFilter = async (query, userId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donor/donation-request/${userId}?${query}`);
    return await res.json()
}


export const getBlodDonetionById = async () => {
    return await fetchDataById("/api/donor/donation-request", session?.id);
}

export const getAllPendingBlodRequest = async (queryString) => {
    return await fetchData(`/api/donation-requests?${queryString}`)
}