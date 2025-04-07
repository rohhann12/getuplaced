import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Your secret (must match NEXTAUTH_SECRET in your .env)
const secret = process.env.NEXTAUTH_SECRET

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret })

  // No token? Redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If token exists, continue
  return NextResponse.next()
}
export const config = {
    matcher: ['/dashboard/:path*', '/protected/:path*'], // Add your secured routes here
  }
  