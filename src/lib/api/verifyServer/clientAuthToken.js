"use client";

import { authClient } from "@/lib/auth-client";

export const getTokenInClient = async () => {
  const { data: session } = await authClient.getSession();

  return session?.session?.token || null;
};