import prisma from "./db";

export async function Email(arr: any[]) {
  function getRandomTen(arr: { id: string; userId: string; founderId: string; isSent: boolean; }[]) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 5);
  }

  const finder = await prisma.$transaction(async (tx) => {
    const unsent = await tx.userFounderStatus.findMany({
      where: { isSent: false }
    });

    if (unsent.length === 0) {
      return "you are doing good,but come back later for more emails";
    }

    const randomTen = getRandomTen(unsent);
    // removed doing it true for isSent here it should be done in 
    // the nodemailer thing
    const emails = await Promise.all(
      randomTen.map((e: any) =>
        tx.founder.findUnique({
          where: {
            id: e.founderId
          },
          select: {
            id:true,
            email: true,
            ctoName:true,
            companyName:true
          }
        })
      )
    );
    return emails;
  });

  return finder;
}
