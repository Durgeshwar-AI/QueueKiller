/*
  Warnings:

  - The values [GENERAL,HEALTH] on the enum `DepartmentType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `BookedSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Upcoming', 'Attended', 'Missed');

-- CreateEnum
CREATE TYPE "statusTypes" AS ENUM ('Available', 'Locked', 'Booked');

-- AlterEnum
BEGIN;
CREATE TYPE "DepartmentType_new" AS ENUM ('General', 'Health');
ALTER TABLE "Department" ALTER COLUMN "type" TYPE "DepartmentType_new" USING ("type"::text::"DepartmentType_new");
ALTER TYPE "DepartmentType" RENAME TO "DepartmentType_old";
ALTER TYPE "DepartmentType_new" RENAME TO "DepartmentType";
DROP TYPE "public"."DepartmentType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "BookedSchedule" DROP CONSTRAINT "BookedSchedule_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "BookedSchedule" DROP CONSTRAINT "BookedSchedule_userId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_departmentId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "logo" TEXT;

-- AlterTable
ALTER TABLE "Department" ALTER COLUMN "type" SET DEFAULT 'General';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
DROP COLUMN "updatedAt",
ADD COLUMN     "dob" TIMESTAMP(3);

-- DropTable
DROP TABLE "BookedSchedule";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "Schedule";

-- CreateTable
CREATE TABLE "Schedules" (
    "id" SERIAL NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "status" "statusTypes" NOT NULL DEFAULT 'Available',

    CONSTRAINT "Schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booked" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "schedulesId" INTEGER NOT NULL,
    "qrCode" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'Upcoming',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booked_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Schedules_departmentId_idx" ON "Schedules"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Booked_schedulesId_key" ON "Booked"("schedulesId");

-- CreateIndex
CREATE INDEX "Booked_userId_idx" ON "Booked"("userId");

-- CreateIndex
CREATE INDEX "Booked_schedulesId_idx" ON "Booked"("schedulesId");

-- CreateIndex
CREATE INDEX "Department_companyId_idx" ON "Department"("companyId");

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booked" ADD CONSTRAINT "Booked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booked" ADD CONSTRAINT "Booked_schedulesId_fkey" FOREIGN KEY ("schedulesId") REFERENCES "Schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
