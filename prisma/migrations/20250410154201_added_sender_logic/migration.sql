/*
  Warnings:

  - Added the required column `userId` to the `template` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "template" DROP CONSTRAINT "template_id_fkey";

-- AlterTable
ALTER TABLE "Founder" ALTER COLUMN "domain" DROP NOT NULL;

-- AlterTable
ALTER TABLE "template" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "template" DROP NOT NULL,
ALTER COLUMN "subject" DROP NOT NULL;

-- CreateTable
CREATE TABLE "sent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "FounderId" TEXT NOT NULL,
    "isSent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "template" ADD CONSTRAINT "template_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sent" ADD CONSTRAINT "sent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sent" ADD CONSTRAINT "sent_FounderId_fkey" FOREIGN KEY ("FounderId") REFERENCES "Founder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
