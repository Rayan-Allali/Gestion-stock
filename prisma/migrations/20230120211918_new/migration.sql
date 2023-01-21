/*
  Warnings:

  - You are about to drop the column `produit` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `productStock` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_produit_fkey";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "produit",
ADD COLUMN     "productStock" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_productStock_fkey" FOREIGN KEY ("productStock") REFERENCES "productstock"("idStock") ON DELETE RESTRICT ON UPDATE CASCADE;
