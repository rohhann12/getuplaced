-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_fkey" FOREIGN KEY ("id") REFERENCES "founders"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
