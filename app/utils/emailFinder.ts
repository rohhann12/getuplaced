import prisma from "./db";

export async function Email(arr: any[],userID:string) {
  const finder = await prisma.$transaction(async (tx) => {
    const unsent = await tx.userFounderStatus.findMany({
      where: {
        isSent: false,
        userId: userID,
      },
      select: {
        founder: {
          select: {
            id: true,
            email: true,
            companyName: true,
            ctoName: true,
          },
        },
      },
      take:5
    });
  
    if (unsent.length === 0) {
      return "you are doing good, but come back later for more emails";
    }
    const emails = unsent.map((e: any) => e.founder);
    return emails;
  });
  return finder;
}
