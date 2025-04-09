import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "../../../../utils/db";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json(); // Expected: [{ subject: "...", template: "..." }, ...]

  const updated = await prisma.user.update({
    where: { email: token.email },
    data: {
      template: {
        create: body, // Prisma will handle the relation via userId
      },
    },
    include: { template: true }, // To return the created templates if needed
  });

  return NextResponse.json({ success: true, template: updated.template });
}
