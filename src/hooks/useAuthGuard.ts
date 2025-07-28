"use client";

import { isTokenValid } from "@/utils/jwt";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthGuard = (redirectTo: string = "/dashboard") => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (isTokenValid(token)) {
      router.replace(redirectTo);
    } else if (token) {
      // Token exists but is expired, clean it up
      localStorage.removeItem("access_token");
    }
  }, [router, redirectTo]);

  return {
    isAuthenticated: isTokenValid(localStorage.getItem("access_token")),
  };
};
