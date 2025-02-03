import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const middleware = async (request: NextRequest) => {
  // Get the token using next-auth's getToken function
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  });

  // Redirect to sign-in if token is not present
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Handle admin dashboard access
  if (request.nextUrl.pathname === "/admin-dashboard") {
    if (token.role === "admin") {
      return NextResponse.next(); // Allow access to admin dashboard
    } else {
      return NextResponse.redirect(new URL("/", request.url)); // Redirect non-admins to home
    }
  }

  // Allow access to other protected routes
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/admin-dashboard/:id*", // Match the admin dashboard route
  ],
};