import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { Email } from "@/app/utils/emailFinder";
import prisma from "@/app/utils/db";
import { tableCreator } from "../../../../utils/tableCreator";
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

        await connectRedis();
        console.log(user.id)
        const redisKey = `data:${user.id}`;  // 👈 user-specific cache key
        let data;
        const cachedData = await client.get(redisKey);

        if (!cachedData) {
            const founderPromise = prisma.founder.findMany();
            const createTablePromise = tableCreator(token);
            const [founders, tableData] = await Promise.all([founderPromise, createTablePromise]);
            data = await Email(founders, user.id);
            await client.set(redisKey, JSON.stringify(data));
        } else {
            data = JSON.parse(cachedData);
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Error occurred" }, { status: 500 });
    }
}
