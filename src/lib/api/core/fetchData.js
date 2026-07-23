import { authHeaderInServer } from "../verifyServer/serverAuthHeader";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;


export const fetchDataById = async (path, id) => {
    const res = await fetch(`${baseUrl}${path}/${id}`);

    return await res.json();
}

export const fetchData = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return await res.json();
}

export const protectedFetchData = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        headers: await authHeaderInServer()
    });
    return await res.json();
}


export const protectedFetchDataById = async (path, id) => {
    const res = await fetch(`${baseUrl}${path}/${id}`, {
        headers: await authHeaderInServer()
    });

    return await res.json();
}




