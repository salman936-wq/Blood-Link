import { NextResponse } from "next/server";
import { getSessionInServer } from "./lib/api/core/session";

export async function proxy(request) {
  const user = await getSessionInServer();
  const { pathname } = request.nextUrl;

  // Login না থাকলে
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const roleRoutes = {
    admin: "/dashboard/admin",
    donor: "/dashboard/donor",
    volunteer: "/dashboard/volunteer",
  };

  const allowedRoute = roleRoutes[user.role];

  // Invalid role
  if (!allowedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // নিজের dashboard ছাড়া অন্য dashboard এ গেলে redirect
  if (
    pathname.startsWith("/dashboard") &&
    !pathname.startsWith(allowedRoute)
  ) {
    return NextResponse.redirect(new URL(allowedRoute, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};