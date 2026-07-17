import { fetchDataById } from "../core/fetchData";
import { getSessionInServer } from "../core/session";

const session = await getSessionInServer()

export const getBlodDonetionById = async () => {
    return await fetchDataById("/api/donor/donation-request", session?.id);
}