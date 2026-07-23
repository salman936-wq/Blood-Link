import { fetchData, protectedFetchData } from "../core/fetchData"

export const getLastThirtyPaymentDetailsForPublic = async () => {
    return await fetchData("/api/public/payments")
}

export const getPersonalPaymentHistory = async (email) => {
    return await protectedFetchData(`/api/donor/payments/${email}`)
}