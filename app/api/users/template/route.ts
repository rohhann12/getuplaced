import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import  prisma  from "../../../utils/db"; // adjust if your prisma path is different

export async function GET(req: NextRequest) {
  const token = await getToken({ req});
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: token.email },
    select: { template: true }, // just get template
  });

  return NextResponse.json({ template: user?.template || null });
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const updated = await prisma.user.update({
    where: { email: token.email },
    data: { template: body.template || "" },
  });

  return NextResponse.json({ success: true, template: updated.template });
}
