"use client";

import { authClient } from "@/lib/auth-client";

export const sessionInCleint = () => {
  const { data: session, isPending } = authClient.useSession();

  return {
    user: session?.user ?? null,
    isLoading: isPending,
  };
};