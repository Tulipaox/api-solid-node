/*
  Warnings:

  - Added the required column `gym_Id` to the `chec_ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `chec_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chec_ins" ADD COLUMN     "gym_Id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "chec_ins" ADD CONSTRAINT "chec_ins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chec_ins" ADD CONSTRAINT "chec_ins_gym_Id_fkey" FOREIGN KEY ("gym_Id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
