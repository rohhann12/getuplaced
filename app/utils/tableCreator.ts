import prisma from "@/app/utils/db";

export async function tableCreator(req: any) {
  const token = req;

  if (!token?.email) {
    return { success: false, message: "Unauthorized" };
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email },
    select: { id: true },
  });

  if (!user) {
    return { success: false, message: "User not found" };
  }

  const existingStatuses = await prisma.userFounderStatus.count({
    where: { userId: user.id },
  });

  const totalFounders = await prisma.founder.count();

  if (existingStatuses === totalFounders) {
    return { success: true, message: "Already initialized" };
  }

  const founders = await prisma.founder.findMany({ select: { id: true } });

  const dataToInsert = founders.map((founder) => ({
    userId: user.id,
    founderId: founder.id,
    isSent: false,
  }));
  try {
    const table=await prisma.userFounderStatus.createMany({
      data: dataToInsert,
      skipDuplicates: true,
    });
    return { success: true, message: "User status initialized" };
  } catch (e) {
    console.error("Error initializing user status:", e);
    return { success: false, message: "Initialization failed" };
  }
}
