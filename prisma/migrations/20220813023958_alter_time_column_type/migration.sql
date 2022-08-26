/*
  Warnings:

  - You are about to drop the column `time` on the `events` table. All the data in the column will be lost.
  - Added the required column `start_time` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "time",
ADD COLUMN     "start_time" TEXT NOT NULL,
ALTER COLUMN "end_time" SET DATA TYPE TEXT;
