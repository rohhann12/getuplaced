import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import prisma from '@/app/utils/db'

export async function GET(req:NextRequest):Promise<any>{
        const token=await getToken({req,secret: process.env.NEXTAUTH_SECRET})
        const email=token?.email
        try {
            const finder=await prisma.user.findMany({
                where:{
                    email:email || ""
                },
                select:{
                    gmailAppPassword:true
                }
            })
            if(finder.length===0 || finder[0].gmailAppPassword===null){
                console.log("finder",finder)
                return NextResponse.json({success:false})
            }
            return NextResponse.json({success:true})
        } catch (error) {
            console.log(error)
            return NextResponse.json({
                message:"error",
                success:false
            })
        }
}