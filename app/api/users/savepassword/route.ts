import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/utils/db'

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const email = token?.email
  if (!email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { appPassword } = await req.json()
  if (!appPassword) return NextResponse.json({ message: 'App password is required' }, { status: 400 })

  const data=await prisma.user.update({
    where: { email },
    data: { gmailAppPassword: appPassword },
  })
  console.log(data.gmailAppPassword)
  return NextResponse.json({ message: 'App password saved' })
}

export async function GET(req: NextRequest) {
    try {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  
      if (!token?.email) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      }
  
      const user = await prisma.user.findUnique({
        where: { email: token.email },
        select: { gmailAppPassword: true },
      })
  
      const hasPassword = user?.gmailAppPassword
      // console.log("hi",user?.gmailAppPassword)
      return NextResponse.json({ hasPassword }, { status: 200 })
    } catch (error) {
      console.error('Error checking Gmail App Password:', error)
      return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }
  }