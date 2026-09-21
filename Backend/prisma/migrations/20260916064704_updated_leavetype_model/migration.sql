/*
  Warnings:

  - You are about to drop the column `annual_leave` on the `LeaveBalance` table. All the data in the column will be lost.
  - You are about to drop the column `personal_leave` on the `LeaveBalance` table. All the data in the column will be lost.
  - You are about to drop the column `sick_leave` on the `LeaveBalance` table. All the data in the column will be lost.
  - You are about to drop the column `used_annual_leave` on the `LeaveBalance` table. All the data in the column will be lost.
  - You are about to drop the column `used_personal_leave` on the `LeaveBalance` table. All the data in the column will be lost.
  - You are about to drop the column `used_sick_leave` on the `LeaveBalance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeId,year,leaveTypeId]` on the table `LeaveBalance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `allocatedDays` to the `LeaveBalance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leaveTypeId` to the `LeaveBalance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leaveTypeId` to the `LeaveRequestHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LeaveBalance_employeeId_year_key";

-- AlterTable
ALTER TABLE "LeaveBalance" DROP COLUMN "annual_leave",
DROP COLUMN "personal_leave",
DROP COLUMN "sick_leave",
DROP COLUMN "used_annual_leave",
DROP COLUMN "used_personal_leave",
DROP COLUMN "used_sick_leave",
ADD COLUMN     "allocatedDays" INTEGER NOT NULL,
ADD COLUMN     "leaveTypeId" INTEGER NOT NULL,
ADD COLUMN     "usedDays" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "LeaveRequestHistory" ADD COLUMN     "leaveTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "LeaveType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "LeaveType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeaveType_name_key" ON "LeaveType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LeaveBalance_employeeId_year_leaveTypeId_key" ON "LeaveBalance"("employeeId", "year", "leaveTypeId");

-- AddForeignKey
ALTER TABLE "LeaveBalance" ADD CONSTRAINT "LeaveBalance_leaveTypeId_fkey" FOREIGN KEY ("leaveTypeId") REFERENCES "LeaveType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveRequestHistory" ADD CONSTRAINT "LeaveRequestHistory_leaveTypeId_fkey" FOREIGN KEY ("leaveTypeId") REFERENCES "LeaveType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
