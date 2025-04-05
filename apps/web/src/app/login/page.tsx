// app/login/page.tsx
"use client";

import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google"; // <-- NestJS backend
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Button onClick={handleLogin}>Login with Google</Button>
    </div>
  );
}
