-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_founderId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "founderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "Founder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
