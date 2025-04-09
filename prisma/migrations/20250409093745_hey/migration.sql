/*
  Warnings:

  - You are about to drop the column `template` on the `User` table. All the data in the column will be lost.
  - The `referalCode` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[gmailAppPassword]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "template",
ADD COLUMN     "gmailAppPassword" TEXT,
DROP COLUMN "referalCode",
ADD COLUMN     "referalCode" INTEGER;

-- CreateTable
CREATE TABLE "template" (
    "id" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "subject" TEXT NOT NULL,

    CONSTRAINT "template_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_gmailAppPassword_key" ON "User"("gmailAppPassword");

-- CreateIndex
CREATE UNIQUE INDEX "User_referalCode_key" ON "User"("referalCode");

-- AddForeignKey
ALTER TABLE "template" ADD CONSTRAINT "template_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
