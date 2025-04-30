import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "../../../../utils/db"; // note path depending on your structure

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  try {
    const dataFetched = await prisma.template.findUnique({
      where: {
        id: id,
      },
      select: {
        subject: true,
        name: true,
        template: true,
      },
    });

    if (dataFetched) {
      return NextResponse.json({
        data: dataFetched,
      });
    } else {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("error is", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
