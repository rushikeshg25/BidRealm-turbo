/*
  Warnings:

  - The values [COLLECTIBLES] on the enum `Categories` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Categories_new" AS ENUM ('ART', 'COLLECTABLES', 'ELECTRONICS', 'VECHICLES', 'WATCHES', 'FASHION', 'SHOES');
ALTER TABLE "Auction" ALTER COLUMN "categories" TYPE "Categories_new" USING ("categories"::text::"Categories_new");
ALTER TYPE "Categories" RENAME TO "Categories_old";
ALTER TYPE "Categories_new" RENAME TO "Categories";
DROP TYPE "Categories_old";
COMMIT;
