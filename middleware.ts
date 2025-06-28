import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedUserRoutes = ["/orders", "/wishlist", "/checkout"];
const protectedAdminRoutes = ["/dashboard"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // 🔐 Redirect if not authenticated
  if (protectedUserRoutes.some((path) => pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 🔒 Admin-only routes
  if (protectedAdminRoutes.some((path) => pathname.startsWith(path))) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
