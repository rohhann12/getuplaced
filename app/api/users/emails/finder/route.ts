import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { Email } from "@/app/utils/emailFinder"
import prisma from "@/app/utils/db"


export  async function GET(req:NextRequest){
    const token=getToken({req})
    try {
        const founder=await prisma.founder.findMany()
        const data=await Email(founder)
        return NextResponse.json({
            data:{data}
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message:"Error occured"
        })
    }
}