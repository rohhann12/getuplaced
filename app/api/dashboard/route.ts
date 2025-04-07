import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = cookies(); // no await here
  const hasCookie = (await cookieStore).has('next-auth.session-token');
  console.log(hasCookie);

  return NextResponse.json({
    mesg: "hi",
    tokenExists: hasCookie
  });
}
