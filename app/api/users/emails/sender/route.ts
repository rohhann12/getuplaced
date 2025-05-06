import prisma from '@/app/utils/db'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest): Promise<any> {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const email = token?.email
    if (!email) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 })
    }

    const data = await req.json()
    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ message: "No recipients found" }, { status: 400 })
    }

    const appPass = await prisma.user.findUnique({
      where: { email },
      select: { gmailAppPassword: true },
    })

    if (!appPass?.gmailAppPassword) {
      return NextResponse.json({ message: "App password not found" }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: appPass.gmailAppPassword,
      },
    })

    let sentCount = 0

    for (const entry of data) {
      const { email: recipientEmail, templateId } = entry

      const template = await prisma.template.findUnique({
        where: { id: templateId },
        select: { subject: true, template: true },
      })

      if (!template) {
        console.log(`Template not found for ID: ${templateId}`)
        continue
      }

      try {
        await transporter.sendMail({
          from: email,
          to: recipientEmail,
          subject: template.subject || "",
          text: template.template || "",
        })
        sentCount++
      } catch (err) {
        console.error(`Failed to send email to ${recipientEmail}:`, err)
      }
    }

    await prisma.user.update({
      where: { email },
      data: {
        sentEmail: {
          increment: sentCount,
        },
      },
    })
    if (sentCount === 0) {
      return NextResponse.json({
        success: false,
        errorCode: 535,
        message: "Gmail authentication failed or emails could not be sent",
      }, { status: 535 }) // status 200 so frontend handles it in `.data`
    }
    
    return NextResponse.json({
      success: true,
      message: `Emails sent: ${sentCount}`
    }, { status: 200 })
  } catch (error) {
    console.error("Error in sending emails:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

