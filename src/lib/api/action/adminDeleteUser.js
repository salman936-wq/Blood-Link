import { authHeaderInClient } from "../verifyServer/clientAuthHeader"
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const deleteUserFromAdmin = async (id) => {
    try {
        const res = await fetch(
            `${baseUrl}/api/dashboard/admin/user/delete/${id}`,
            {
                method: "DELETE",
                headers: await authHeaderInClient()
            }
        );

        if (!res.ok) {
            throw new Error("Failed to delete user");
        }

        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};