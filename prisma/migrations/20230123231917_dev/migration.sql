/*
  Warnings:

  - You are about to drop the `concerne` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "concerne" DROP CONSTRAINT "concerne_BonCommande_fkey";

-- DropForeignKey
ALTER TABLE "concerne" DROP CONSTRAINT "concerne_produit_fkey";

-- DropTable
DROP TABLE "concerne";

-- CreateTable
CREATE TABLE "contient" (
    "qte" INTEGER NOT NULL,
    "produit" INTEGER NOT NULL,
    "BonCommande" INTEGER NOT NULL,

    CONSTRAINT "contient_pkey" PRIMARY KEY ("BonCommande","produit")
);

-- AddForeignKey
ALTER TABLE "contient" ADD CONSTRAINT "contient_produit_fkey" FOREIGN KEY ("produit") REFERENCES "produit"("codeP") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contient" ADD CONSTRAINT "contient_BonCommande_fkey" FOREIGN KEY ("BonCommande") REFERENCES "bonCommande"("idBon") ON DELETE CASCADE ON UPDATE CASCADE;
