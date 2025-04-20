/*
  Warnings:

  - You are about to alter the column `sentEmail` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to drop the column `FounderId` on the `sent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,founderId]` on the table `sent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,domain]` on the table `template` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `founderId` to the `sent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain` to the `template` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sent" DROP CONSTRAINT "sent_FounderId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "sentEmail" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "sent" DROP COLUMN "FounderId",
ADD COLUMN     "founderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "template" ADD COLUMN     "domain" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sent_userId_founderId_key" ON "sent"("userId", "founderId");

-- CreateIndex
CREATE UNIQUE INDEX "template_userId_domain_key" ON "template"("userId", "domain");

-- AddForeignKey
ALTER TABLE "sent" ADD CONSTRAINT "sent_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "Founder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
