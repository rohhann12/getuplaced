import prisma from '@/app/utils/db'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export  async function POST(req:NextRequest):Promise<any>{
    const token=await getToken({req,secret: process.env.NEXTAUTH_SECRET})
    const email=token?.email
    const useremail=email
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
                user : email,
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

        if(finder && userWithTemplates){
            async function sendOtpEmail(){
                const mailOptions = {
                    from : useremail ||'default@example.com',
                    to : finder.map(e=>e.email), 
                    subject: userWithTemplates?.template[0]?.subject,
                    text: userWithTemplates?.template[0]?.template
    
                }
            
                try{
                    transporter.sendMail(mailOptions);
                    console.log(`email sent`);
                }
        
                catch(error){
                    console.log(error);
                }
            }
            await sendOtpEmail();
            return NextResponse.json({ message: "Emails sent" });
        }else{
            return NextResponse.json({ message: "Emails not sent" });
        }
    }
}