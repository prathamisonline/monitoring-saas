import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");

  // This won't actually render because of the redirect above
  // It's kept here just as a fallback
  return (
    <div className="grid min-h-screen items-center justify-items-center">
      Redirecting to dashboard...
    </div>
  );
}
