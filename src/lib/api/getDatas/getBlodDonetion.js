
import { fetchData, fetchDataById } from "../core/fetchData";
import { getSessionInServer } from "../core/session";

const session = await getSessionInServer()

// Admin and Volentare - get all request for blod
export const getAdminBlodDonetionWithFilter = async (query) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/donation-request?${query}`);
    return await res.json()
}

// Admin - get all user for handle
export const getAdminUsersWithFilter = async (query) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/user-request?${query}`);
    return await res.json()
}

// Donor - get all personal request for blod
export const getBlodDonetionByIdWithFilter = async (query, userId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donor/donation-request/${userId}?${query}`);
    return await res.json()
}

// Donor - get all personal request for blod
export const getBlodDonetionById = async () => {
    return await fetchDataById("/api/donor/donation-request", session?.id);
}

// Public get all rquest (Filter: Pending)
export const getAllPendingBlodRequest = async (queryString) => {
    return await fetchData(`/api/donation-requests?${queryString}`)
}