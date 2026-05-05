/*
  Warnings:

  - A unique constraint covering the columns `[razorpayOrderId]` on the table `Booked` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[razorpayPaymentId]` on the table `Booked` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Booked" ADD COLUMN     "bookingPrice" INTEGER,
ADD COLUMN     "platformFee" INTEGER,
ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPaymentId" TEXT,
ADD COLUMN     "totalAmount" INTEGER;

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 100;

-- CreateIndex
CREATE UNIQUE INDEX "Booked_razorpayOrderId_key" ON "Booked"("razorpayOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "Booked_razorpayPaymentId_key" ON "Booked"("razorpayPaymentId");
