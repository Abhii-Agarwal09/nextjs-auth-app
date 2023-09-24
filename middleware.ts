import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log("Path: ", path);
  const isPublicRoute =
    path === "/login" || path === "/signup" || path === "/verifyEmail";
  const token = request.cookies.get("token")?.value || "";

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/profile", "/login", "/signup", "/verifyEmail"],
};
