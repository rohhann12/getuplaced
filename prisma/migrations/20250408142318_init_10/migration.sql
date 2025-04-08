/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailuser]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailuser` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_id_fkey";

-- DropIndex
DROP INDEX "user_email_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "email",
ADD COLUMN     "emailuser" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_emailuser_key" ON "user"("emailuser");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_emailuser_fkey" FOREIGN KEY ("emailuser") REFERENCES "founders"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
