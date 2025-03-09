/*
  Warnings:

  - The `serviceType` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Wash', 'DryClean', 'HangClean');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "serviceType",
ADD COLUMN     "serviceType" "Type" NOT NULL DEFAULT 'Wash';
