import prisma from "@/app/utils/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const existingStatuses = await prisma.userFounderStatus.count({
    where: { userId: user.id },
  });

  const totalFounders = await prisma.founder.count();

  if (existingStatuses === totalFounders) {
    return NextResponse.json({ message: "Already initialized" });
  }

  const founders = await prisma.founder.findMany({ select: { id: true } });

  await Promise.all(
    founders.map((founder) =>
      prisma.userFounderStatus.upsert({
        where: {
          userId_founderId: {
            userId: user.id,
            founderId: founder.id,
          },
        },
        update: {},
        create: {
          userId: user.id,
          founderId: founder.id,
          isSent: false,
        },
      })
    )
  );

  return NextResponse.json({ message: "User status initialized" });
}
