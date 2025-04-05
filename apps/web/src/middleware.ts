// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  exp: number;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
      }

      // 🔐 Example: Role-based routing (not used yet, but possible!)
      // if (decoded.role !== 'admin' && pathname.startsWith('/admin')) {
      //   return NextResponse.redirect(new URL('/dashboard', request.url));
      // }

      // Redirect authenticated users away from /login
      if (pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (err) {
      console.error("Invalid JWT:", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // If no token, block protected routes
    const protectedRoutes = ["/dashboard", "/projects", "/settings"];
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/projects/:path*",
    "/settings/:path*",
  ],
};
