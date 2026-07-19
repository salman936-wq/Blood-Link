import { fetchData } from "../core/fetchData"


export const getAllUserForBlod = async (query) => {
return await fetchData(`/api/all-donor?${query}`);
}