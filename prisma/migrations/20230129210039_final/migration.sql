/*
  Warnings:

  - You are about to drop the column `YearP` on the `pointC` table. All the data in the column will be lost.
  - You are about to drop the column `YearP` on the `pointF` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pointC" DROP COLUMN "YearP",
ADD COLUMN     "yearP" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "pointF" DROP COLUMN "YearP",
ADD COLUMN     "yearP" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
