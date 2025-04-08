import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.email) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log("Token verified:", token.email);
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*"],
};
