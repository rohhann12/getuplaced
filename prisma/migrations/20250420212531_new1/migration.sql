/*
  Warnings:

  - You are about to drop the column `domain` on the `sent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,domain]` on the table `template` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sent" DROP COLUMN "domain";

-- CreateIndex
CREATE UNIQUE INDEX "template_userId_domain_key" ON "template"("userId", "domain");
