import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  
  if (!token || !token.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Redirect URL for Google's OAuth consent screen
  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(`${process.env.NEXTAUTH_URL}/api/auth/callback/google`)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent('https://www.googleapis.com/auth/gmail.send')}` +
    `&prompt=consent` +
    `&access_type=offline` +
    `&login_hint=${encodeURIComponent(token.email as string)}`;

  return NextResponse.json({ redirectUrl });
}