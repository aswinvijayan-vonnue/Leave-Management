-- CreateEnum
CREATE TYPE "Role" AS ENUM ('employee', 'manager');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'employee';
