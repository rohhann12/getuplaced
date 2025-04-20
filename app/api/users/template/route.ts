import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import  prisma  from "../../../utils/db"; 

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: token.email },
      select: {
        template: {
          select: {
            id:true,
            template: true,
            subject: true,
            domain:true
          },
        },
      },
    });
    console.log(user)
    return NextResponse.json({ templates: user?.template || [] });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ templates: "fuck you"});
  }
}