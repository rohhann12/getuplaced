import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
import { Email } from "@/app/utils/emailFinder"
import prisma from "@/app/utils/db"
import axios from "axios"
import { tableCreator } from "../../../../utils/tableCreator"

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

        // Begin both async tasks in parallel
        const founderPromise = prisma.founder.findMany();
        const createTablePromise = tableCreator(token);

        // Wait for both in parallel
        const [founders, _] = await Promise.all([founderPromise, createTablePromise]);

        const data = await Email(founders, user.id);

        return NextResponse.json({ data });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Error occurred" }, { status: 500 });
    }
}
