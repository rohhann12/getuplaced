import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "../../../../utils/db";

// Use 'context' instead of direct destructuring for clarity
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
     const id = (await params).id; 
  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const dataFetched = await prisma.template.findUnique({
      where: {
        id,
      },
      select: {
        subject: true,
        name: true,
        template: true,
      },
    });

    if (dataFetched) {
      return NextResponse.json({ data: dataFetched });
    } else {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("error is", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
