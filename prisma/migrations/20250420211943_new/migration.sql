/*
  Warnings:

  - Added the required column `domain` to the `sent` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "template_userId_domain_key";

-- AlterTable
ALTER TABLE "sent" ADD COLUMN     "domain" TEXT NOT NULL;
