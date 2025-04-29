import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "../../../utils/db"; 
import { v4 as uuidv4 } from "uuid";
export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rawText = await req.text();
    console.log("Raw request body:", rawText);
    
    let body;
    try {
      body = JSON.parse(rawText);
      console.log("Parsed body:", body);
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: token.email }, select: { id: true } });
    if (!user) {
      throw new Error("User not found");
    }

    // ✅ Count how many templates user already has
    const templateCount = await prisma.template.count({
      where: { userId: user.id },
    });

    console.log("Template count for user:", templateCount);

    const create = await prisma.template.create({
      data: {
        id: body.id,
        name: `Template${templateCount + 1}`, // ✅ Template1, Template2, Template3, etc
        template: "",
        subject: "",
        userId: user.id,
      },
    });

    return NextResponse.json(create);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: token.email,
      },
      select: {
        id: true,
        email: true,
      }
    });

    if (user) {
      const finder = await prisma.template.findMany({
        where: {
          userId: user.id,
        }
      });
      // console.log("hienfaknefa",finder)
      return NextResponse.json(finder);
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
