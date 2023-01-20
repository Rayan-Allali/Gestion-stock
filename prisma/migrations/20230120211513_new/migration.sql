/*
  Warnings:

  - Added the required column `produit` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "produit" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_produit_fkey" FOREIGN KEY ("produit") REFERENCES "produit"("codeP") ON DELETE RESTRICT ON UPDATE CASCADE;
