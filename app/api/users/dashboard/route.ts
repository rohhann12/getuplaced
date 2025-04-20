import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { getToken } from "next-auth/jwt";
// for how many emails sent
export async function GET(req:NextRequest){
    const token=await getToken({req,secret: process.env.NEXTAUTH_SECRET})
    const user=token?.email
    const finder=await prisma.user.findUnique({
        where:{
            email:user || ""
        },
        select:{
            sentEmail:true
        }
    })
    if (finder) {
        const safeMessage = {
            ...finder,
            sentEmail: Number(finder.sentEmail), // or use .toString() if needed
        };
    
        return NextResponse.json({
            message: safeMessage
        });    
    }else{
        return NextResponse.json({
            message:"error"
        })
    }
}

export async function POST(){
    // used to trigger another backend request which will call the nodemailer
}