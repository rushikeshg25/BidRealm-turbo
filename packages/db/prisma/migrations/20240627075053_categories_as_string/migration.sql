/*
  Warnings:

  - Changed the type of `categories` on the `Auction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Auction" DROP COLUMN "categories",
ADD COLUMN     "categories" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Categories";
