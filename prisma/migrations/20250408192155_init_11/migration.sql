/*
  Warnings:

  - Added the required column `domain` to the `Founder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Founder" ADD COLUMN     "domain" TEXT NOT NULL;
