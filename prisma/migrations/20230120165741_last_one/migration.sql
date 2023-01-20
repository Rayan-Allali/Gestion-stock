/*
  Warnings:

  - You are about to drop the column `stock` on the `stocker` table. All the data in the column will be lost.
  - You are about to drop the `stock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "stocker" DROP CONSTRAINT "stocker_stock_fkey";

-- AlterTable
ALTER TABLE "stocker" DROP COLUMN "stock";

-- DropTable
DROP TABLE "stock";

-- CreateTable
CREATE TABLE "productstock" (
    "idStock" SERIAL NOT NULL,
    "qte" INTEGER NOT NULL,
    "prixV" INTEGER NOT NULL,
    "prixHt" INTEGER,
    "produit" INTEGER NOT NULL,

    CONSTRAINT "productstock_pkey" PRIMARY KEY ("idStock")
);

-- AddForeignKey
ALTER TABLE "productstock" ADD CONSTRAINT "productstock_produit_fkey" FOREIGN KEY ("produit") REFERENCES "produit"("codeP") ON DELETE RESTRICT ON UPDATE CASCADE;
