/*
  Warnings:

  - The primary key for the `pointC` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pointF` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `idPoint` to the `pointC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPoint` to the `pointF` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pointC" DROP CONSTRAINT "pointC_pkey",
ADD COLUMN     "idPoint" INTEGER NOT NULL,
ADD CONSTRAINT "pointC_pkey" PRIMARY KEY ("idPoint");

-- AlterTable
ALTER TABLE "pointF" DROP CONSTRAINT "pointF_pkey",
ADD COLUMN     "idPoint" INTEGER NOT NULL,
ADD CONSTRAINT "pointF_pkey" PRIMARY KEY ("idPoint");
