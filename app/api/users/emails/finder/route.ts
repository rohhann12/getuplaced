import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { Email } from "@/app/utils/emailFinder"
import prisma from "@/app/utils/db"
import axios from "axios"
import { tableCreator } from "../../../../utils/tableCreator"
import { client, connectRedis } from "@/app/utils/redis";
export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: token.email || "" }
        });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const founderPromise = prisma.founder.findMany();
        const createTablePromise = tableCreator(token);
        const [founders, tableData] = await Promise.all([founderPromise, createTablePromise]);
        const data = await Email(founders, user.id);
        await connectRedis();
        const setting = await client.set("data", JSON.stringify(data));
        return NextResponse.json({ data, redisSet: setting });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Error occurred" }, { status: 500 });
    }
}
