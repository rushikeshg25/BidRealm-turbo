/*
  Warnings:

  - You are about to alter the column `startingPrice` on the `Auction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `currentPrice` on the `Auction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Auction" ALTER COLUMN "startingPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "currentPrice" SET DATA TYPE INTEGER;
