-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_role_id_fkey";

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
