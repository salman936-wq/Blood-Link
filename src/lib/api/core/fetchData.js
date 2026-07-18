const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchDataById = async (path, id) => {
    const res = await fetch(`${baseUrl}${path}/${id}`);
    return await res.json();
}

export const fetchData = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return await res.json();
}

