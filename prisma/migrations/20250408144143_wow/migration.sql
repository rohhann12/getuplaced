/*
  Warnings:

  - You are about to drop the `founders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_emailuser_fkey";

-- DropTable
DROP TABLE "founders";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "Founder" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "ctoName" TEXT NOT NULL,

    CONSTRAINT "Founder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hits" INTEGER DEFAULT 2,
    "referalCode" TEXT,
    "founderId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Founder_email_key" ON "Founder"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Founder_companyName_key" ON "Founder"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "Founder_ctoName_key" ON "Founder"("ctoName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_referalCode_key" ON "User"("referalCode");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "Founder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
