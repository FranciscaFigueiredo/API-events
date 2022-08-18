/*
  Warnings:

  - A unique constraint covering the columns `[google_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[facebook_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "facebook_token" TEXT,
ADD COLUMN     "google_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_google_token_key" ON "users"("google_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_facebook_token_key" ON "users"("facebook_token");
