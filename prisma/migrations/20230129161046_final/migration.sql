/*
  Warnings:

  - A unique constraint covering the columns `[produit]` on the table `entreeStock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `modifiedAt` to the `achat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `fournisseur` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "entreeStock" DROP CONSTRAINT "entreeStock_produit_fkey";

-- AlterTable
ALTER TABLE "achat" ADD COLUMN     "DateA" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "fournisseur" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "entreeStock_produit_key" ON "entreeStock"("produit");

-- AddForeignKey
ALTER TABLE "entreeStock" ADD CONSTRAINT "entreeStock_produit_fkey" FOREIGN KEY ("produit") REFERENCES "productstock"("idStock") ON DELETE CASCADE ON UPDATE CASCADE;
