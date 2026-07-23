"use client";

import { getTokenInClient } from "./clientAuthToken";

export const authHeaderInClient = async () => {
  const token = await getTokenInClient();

  return token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
};