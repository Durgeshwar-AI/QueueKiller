/*
  Warnings:

  - The values [ONLINE,OFFLINE,HYBRID] on the enum `DepartmentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DepartmentType_new" AS ENUM ('GENERAL', 'HEALTH');
ALTER TABLE "Department" ALTER COLUMN "type" TYPE "DepartmentType_new" USING ("type"::text::"DepartmentType_new");
ALTER TYPE "DepartmentType" RENAME TO "DepartmentType_old";
ALTER TYPE "DepartmentType_new" RENAME TO "DepartmentType";
DROP TYPE "public"."DepartmentType_old";
COMMIT;

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
