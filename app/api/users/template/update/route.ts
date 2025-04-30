import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "../../../../utils/db"; 

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("body is",body)
    const createdTemplate = await prisma.template.update({
      where: {id:body.id},   
      data: {
        name: body.templateName,
        subject: body.subject,
        template: body.body,
      },
    });

    return NextResponse.json({ template: createdTemplate });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
