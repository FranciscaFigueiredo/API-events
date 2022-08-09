/*
  Warnings:

  - A unique constraint covering the columns `[google_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[facebook_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `facebook_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `google_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "facebook_id" TEXT NOT NULL,
ADD COLUMN     "google_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_facebook_id_key" ON "users"("facebook_id");
