import { getTokenInServer } from "./serverAuthToken";


export const authHeaderInServer = async () => {
  const token = await getTokenInServer();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {};
  return header;
}