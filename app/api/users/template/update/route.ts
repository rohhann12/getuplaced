
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import  prisma  from "../../../../utils/db"; 

export async function POST(req: NextRequest) {
    const token = await getToken({ req });
    console.log("token is",token)
    if (!token?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const res=await req.json()
    // it will have domain and template updates
    try{
        // first find id of user from email id from token
        // then update template of that domain of that template
        // id of that user id
        const userId=await prisma.user.findUnique({
            where:{
                email:token.email
            },
            select:{
                id:true
            }
        })
        if(userId){
            await prisma.template.update({
                where: {
                  userId_domain: {
                    userId: userId.id,
                    domain: res.domain,
                  },
                },
                data: {
                  template: res.template,
                },
              });
              
        }
    } catch (error) {
      return NextResponse.json({ success: true,data:"error"});
    }
}