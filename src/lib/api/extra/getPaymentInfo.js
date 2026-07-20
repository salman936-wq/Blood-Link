import { fetchData } from "../core/fetchData"

export const getLastThirtyPaymentDetailsForPublic = async () => {
    return await fetchData("/api/public/payments")
}