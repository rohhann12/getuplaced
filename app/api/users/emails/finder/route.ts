import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { Email } from "@/app/utils/emailFinder"
import prisma from "@/app/utils/db"
import axios from "axios"
import { tableCreator } from "../../../../utils/tableCreator"


export async function GET(req: NextRequest) {
    const token = await getToken({ req })
    // console.log(token)
    try {
        if (token) {
            const id = await prisma.user.findUnique({
                where: {
                    email: token?.email || ""
                }
            })

            if (!id) {
                return NextResponse.json({
                    message: "User not found"
                }, { status: 404 })
            }
            
            const founderPromise = prisma.founder.findMany()
            const createTablePromise = tableCreator(token)
            
            // Correctly destructuring the result of Promise.all
            const [founders, createTableResult] = await Promise.all([
                founderPromise,
                createTablePromise
            ])
            
            // console.log(founders) // This is your array of founders
            const data = await Email(founders, id.id)
            // console.log(data)
            return NextResponse.json({
                data: { data }
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Error occurred"
        }, { status: 500 })
    }
    
    return NextResponse.json({
        message: "Unauthorized"
    }, { status: 401 })
}