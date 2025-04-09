import prisma from '@/app/utils/db'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export  async function POST(req:NextRequest):Promise<any>{
    const token=await getToken({req,secret: process.env.NEXTAUTH_SECRET})
    const email=token?.email
    
    if(email){
        const appPass=await prisma.user.findUnique({
            where:{email
            },select:{
                gmailAppPassword:true
            }
        })
        if (!appPass?.gmailAppPassword) {
            return NextResponse.json({ message: "App password not found" }, { status: 400 });
        }
        
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user : "rsharma7_be22@thapar.edu",
                pass: appPass.gmailAppPassword,

            }
        });
        const finder=await prisma.founder.findMany({
            select:{email:true,
                companyName:true,
                ctoName:true,
                // domain
            }
        })
        const userWithTemplates = await prisma.user.findUnique({
            where: { email },
            select: {
              template: {
                select: { template: true, subject: true }
              }
            }
          });
          
        console.log("type of finder",typeof(userWithTemplates))
        async function sendOtpEmail(email:string , otp:string ){
            const mailOptions = {
                from : email,
                to : finder.map(e => e.email),   //app map here to map from founders list
                subject: userWithTemplates?.template[0]?.subject,
                jtext: userWithTemplates?.template[0]?.template

            }
        
            try{
                transporter.sendMail(mailOptions);
                console.log(`otp sent to ${email}  :${otp}`);
            }
    
            catch(error){
                console.log(error);
            }
        }
        await sendOtpEmail(email, "123456");
        return NextResponse.json({ message: "OTP emails sent" });
    }
}