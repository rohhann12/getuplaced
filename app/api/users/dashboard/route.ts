import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";

// export async function POST(req: NextRequest): Promise<NextResponse> {
//   try {
//     const body = await req.json(); // await is needed
//     const { domain } = body;

//     const findCompanies = await prisma.founder.findMany({
//       where: { domain: domain }
//     });

//     return NextResponse.json({
//       companies: findCompanies
//     });
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch company data" },
//       { status: 500 }
//     );
//   }
// }
