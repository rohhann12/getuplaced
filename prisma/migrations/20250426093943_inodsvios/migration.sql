/*
  Warnings:

  - You are about to drop the column `domain` on the `template` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "template_userId_domain_key";

-- AlterTable
ALTER TABLE "template" DROP COLUMN "domain",
ADD COLUMN     "name" TEXT;
