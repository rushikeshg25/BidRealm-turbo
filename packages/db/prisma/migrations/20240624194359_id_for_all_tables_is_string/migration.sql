/*
  Warnings:

  - The primary key for the `Auction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Bid` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterEnum
ALTER TYPE "AuctionStatus" ADD VALUE 'INACTIVE';

-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_auctionId_fkey";

-- AlterTable
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Auction_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Auction_id_seq";

-- AlterTable
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "auctionId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Bid_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Bid_id_seq";

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
