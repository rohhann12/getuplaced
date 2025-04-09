import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import  prisma  from "../../../utils/db"; 

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { email: token.email },
    select: {
      template: {
        select: {
          template: true,
          subject: true,
        },
      },
    },
  });

  return NextResponse.json({ templates: user?.template || [] });
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const updated = await prisma.user.update({
    where: { email: token.email },
      data: {
        template: {
          create: body,
        },
    },
  });
  
  return NextResponse.json({ success: true, template: updated });
}
