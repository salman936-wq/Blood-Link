import { fetchData, protectedFetchData } from "../core/fetchData"

export const getLastThirtyPaymentDetailsForPublic = async () => {
    return await fetchData("/api/public/payments")
}

export const getAllPaymentDetailsForAdmin = async () => {
    return await protectedFetchData("/api/admin/payments")
}

export const getPersonalPaymentHistory = async (email) => {
    return await protectedFetchData(`/api/donor/payments/${email}`)
}