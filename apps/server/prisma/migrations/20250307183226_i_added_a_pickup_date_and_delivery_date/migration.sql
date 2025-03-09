/*
  Warnings:

  - Added the required column `deliveryDateTime` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupDateTime` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryDateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pickupDateTime" TIMESTAMP(3) NOT NULL;
