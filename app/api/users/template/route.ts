import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import  prisma  from "../../../utils/db"; 

// export async function GET(req: NextRequest) {
//   const token = await getToken({ req });
//   if (!token?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   const user = await prisma.user.findUnique({
//     where: { email: token.email },
//     select: {
//       template: {
//         select: {
//           template: true,
//           subject: true,
//         },
//       },
//     },
//   });

//   return NextResponse.json({ templates: user?.template || [] });
// }
// export async function POST(req: NextRequest) {
//   const token = await getToken({ req });
//   if (!token?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const body = await req.json();
//   console.log(body)
//   try {
//     const user = await prisma.user.findUnique({
//       where: { email: token.email },
//       include: { template: true }, // Pull the template(s)
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     await prisma.user.update({
//       where: { email: token.email },
//       data: {
//         template: {
//           update: {
//             where: { id: user.template[0].id },
//             data: {
//               template: body.template ?? "",
//             },
//           },
//         },
//       },
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "An error occurred" }, { status: 500 });
//   }
// }
