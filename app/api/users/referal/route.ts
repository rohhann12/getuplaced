import GenerateRandomStrings from "@/app/utils/randomGenerator";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { getToken } from "next-auth/jwt";

export async function GET(req:NextRequest) {
  const token = await getToken({ req,secret: process.env.NEXTAUTH_SECRET });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const finder=await prisma.user.findUnique({
    where:{email:token.email},
    select:{
      referalCode:true
    }
  })
  if(!finder){
    const a=GenerateRandomStrings()
    if(a){
      await prisma.user.update({
        where:{email:token.email},
        data:{
          referalCode:Number(a)
        }
      })
    }
    return NextResponse.json({
      message:a
    })
  }else{
    return NextResponse.json({finder});
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const referalCode = body.data;

    const token = await getToken({ req });
    const email = token?.email;

    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const checker = await prisma.user.findUnique({
      where: { referalCode },
    });

    if (checker) {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { hits: true },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const updated = await prisma.user.update({
        where: { email },
        data: { hits: user.hits! + 1 },
      });

      return NextResponse.json({ success: true, updatedHits: updated.hits });
    } else {
      return NextResponse.json({ error: "Referral code not found" }, { status: 400 });
    }
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
