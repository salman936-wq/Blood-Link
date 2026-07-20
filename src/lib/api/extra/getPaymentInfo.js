import { fetchData } from "../core/fetchData"

export const getLastThirtyPaymentDetailsForPublic = async () => {
    return await fetchData("/api/public/payments")
}

export const getPersonalPaymentHistory = async (email) => {
    return await fetchData(`/api/donor/payments/${email}`)
}