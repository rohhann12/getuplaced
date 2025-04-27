import prisma from '@/app/utils/db'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest): Promise<any> {
  try {
    // Retrieve the JWT token and the user's email
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const email = token?.email

    // Ensure the email is available in the token
    if (!email) {
      return NextResponse.json({ message: "User not authenticated" }, { status: 401 })
    }

    // Parse the request body
    const data = await req.json()
    // const data = JSON.parse(data)
    console.log("Finder is", data)

    // Fetch the user's Gmail app password
    const appPass = await prisma.user.findUnique({
      where: { email },
      select: {
        gmailAppPassword: true,
      },
    })

    // If Gmail app password is not found, return an error
    if (!appPass?.gmailAppPassword) {
      return NextResponse.json({ message: "App password not found" }, { status: 400 })
    }

    // Create a transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: appPass.gmailAppPassword,
      },
    })

    // Fetch the email template for the user
    const userWithTemplates = await prisma.user.findUnique({
      where: { email },
      select: {
        template: {
          select: { template: true, subject: true },
        },
      },
    })

    // If no templates found, return an error
    if (!userWithTemplates?.template) {
      return NextResponse.json({ message: "Email template not found" }, { status: 400 })
    }

    // Ensure the data data exists and has the necessary structure
    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ message: "No recipients found" }, { status: 400 })
    }

    // Prepare the email options
    const mailOptions = {
      from: email || 'default@example.com',
      to: data.map((e: any) => e.email), // Ensure 'email' exists in each data item
      subject: userWithTemplates?.template[0]?.subject || "Default Subject",
      text: userWithTemplates?.template[0]?.template || "Default template text",
    }
    const dataSize=data.length
    // Send the email
    const emailSent=await transporter.sendMail(mailOptions)
    console.log(`Emails sent successfully`)
      const user = await prisma.user.findUnique({
        where: { email },
        select: { sentEmail: true },
      })
      if (emailSent && user) {
        await prisma.user.update({
          where: { email },
          data: {
            sentEmail: (user.sentEmail || 0) + dataSize,
          },
        })
      }
    return NextResponse.json({ message: "Emails sent successfully" })

  } catch (error) {
    console.error("Error in sending emails:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
