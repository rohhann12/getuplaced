import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { getToken } from "next-auth/jwt";
// for how many emails sent

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const user = token?.email
  
    try {
      const finder = await prisma.user.findUnique({
        where: {
          email: user || '',
        },
        select: {
          sentEmail: true,
        },
      })
  
      if (finder?.sentEmail !== undefined && finder?.sentEmail !== null) {
        return NextResponse.json({
          sentEmail: Number(finder.sentEmail),
        })
      } else {
        return NextResponse.json({
          error: 'No sentEmail found',
        }, { status: 404 })
      }
    } catch (error) {
      console.error('Error fetching sentEmail:', error)
      return NextResponse.json({
        error: 'Internal server error',
      }, { status: 500 })
    }
}
