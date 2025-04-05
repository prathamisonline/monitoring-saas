// src/hooks/useUser.ts
"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  email: string;
  name: string;
  sub: string;
  picture?: string;
  exp: number;
  iat: number;
}

export function useUser() {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser(decoded);
      } catch (e) {
        console.error("Invalid JWT:", e);
        setUser(null);
      }
    }
  }, []);

  return user;
}
