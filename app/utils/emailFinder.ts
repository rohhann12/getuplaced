import prisma from "./db";

export async function Email(arr: any[],userID:string) {
  function getRandomTen(arr:any) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 5);
  }
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
    });
  
    if (unsent.length === 0) {
      return "you are doing good, but come back later for more emails";
    }
  
    const randomTen = getRandomTen(unsent);
    const emails = randomTen.map((e: any) => e.founder);
    return emails;
  });
  return finder;
}
