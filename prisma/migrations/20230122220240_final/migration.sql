-- DropForeignKey
ALTER TABLE "concerne" DROP CONSTRAINT "concerne_BonCommande_fkey";

-- DropForeignKey
ALTER TABLE "concerne" DROP CONSTRAINT "concerne_produit_fkey";

-- DropForeignKey
ALTER TABLE "entreeStock" DROP CONSTRAINT "entreeStock_produit_fkey";

-- DropForeignKey
ALTER TABLE "productstock" DROP CONSTRAINT "productstock_produit_fkey";

-- DropForeignKey
ALTER TABLE "sortieStock" DROP CONSTRAINT "sortieStock_produit_fkey";

-- DropForeignKey
ALTER TABLE "stocker" DROP CONSTRAINT "stocker_produit_fkey";

-- DropForeignKey
ALTER TABLE "vente" DROP CONSTRAINT "vente_produit_fkey";

-- AddForeignKey
ALTER TABLE "vente" ADD CONSTRAINT "vente_produit_fkey" FOREIGN KEY ("produit") REFERENCES "produit"("codeP") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concerne" ADD CONSTRAINT "concerne_produit_fkey" FOREIGN KEY ("produit") REFERENCES "produit"("codeP") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concerne" ADD CONSTRAINT "concerne_BonCommande_fkey" FOREIGN KEY ("BonCommande") REFERENCES "bonCommande"("idBon") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stocker" ADD CONSTRAINT "stocker_produit_fkey" FOREIGN KEY ("produit") REFERENCES "produit"("codeP") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productstock" ADD CONSTRAINT "productstock_produit_fkey" FOREIGN KEY ("produit") REFERENCES "produit"("codeP") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entreeStock" ADD CONSTRAINT "entreeStock_produit_fkey" FOREIGN KEY ("produit") REFERENCES "produit"("codeP") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sortieStock" ADD CONSTRAINT "sortieStock_produit_fkey" FOREIGN KEY ("produit") REFERENCES "produit"("codeP") ON DELETE CASCADE ON UPDATE CASCADE;
