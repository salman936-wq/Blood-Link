export const authenticator = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/imagekit/auth`
    );

    if (!res.ok) {
      throw new Error("Authentication failed");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};