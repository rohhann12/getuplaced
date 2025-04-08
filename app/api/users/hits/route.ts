import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/app/utils/db";

export async function GET(req:NextRequest){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // console.log("Token verified:", token);
    const email=token?.email
    if (!email) {
        throw new Error("Email is required");
      }
      
      const user = await prisma.user.findUnique({
        where: { email },
        select: { hits: true }, // Only fetch hits if that's all you need
      });
      
      if (!user) {
        throw new Error("User not found");
      }
      
      const remainingHits = user.hits;
    //   console.log("Remaining hits:", remainingHits);
    return NextResponse.json({
        hits:remainingHits
    })
}