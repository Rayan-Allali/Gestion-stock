/*
  Warnings:

  - Added the required column `prixV` to the `entreeStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produit` to the `entreeStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qte` to the `entreeStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prixV` to the `sortieStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "entreeStock" ADD COLUMN     "prixV" INTEGER NOT NULL,
ADD COLUMN     "produit" INTEGER NOT NULL,
ADD COLUMN     "qte" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sortieStock" ADD COLUMN     "prixHt" INTEGER,
ADD COLUMN     "prixV" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "entreeStock" ADD CONSTRAINT "entreeStock_produit_fkey" FOREIGN KEY ("produit") REFERENCES "produit"("codeP") ON DELETE RESTRICT ON UPDATE CASCADE;
