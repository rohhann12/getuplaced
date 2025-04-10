import prisma from "./db";
export async function Email(){
    let arr2:any=[]; 
    function getRandomTen(arr: { id: string; userId: string; FounderId: string; isSent: boolean; }[]) {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        arr2=shuffled.slice(0,10)
        return arr2;
    }
    // we have to find emails of founders jinko mail ni bheji and we are sending them email
    const finder=await prisma.$transaction(async(tx)=>{
        const unsent=await tx.sent.findMany({
            where:{isSent:false}
        })
        if(unsent.length===0){
            return "you are doing good,but come back later for more emails"
        }
        const randomTen = getRandomTen(unsent);
        await tx.sent.updateMany({
            where:{
                id:{
                    in:randomTen.map((e:any)=>e.id)
                }
            },
            data:{
                isSent:true
            }
        })
        return randomTen
    })
    return finder
}