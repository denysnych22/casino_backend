/*
  Warnings:

  - Made the column `points` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "points" SET NOT NULL,
ALTER COLUMN "points" SET DEFAULT 10;
