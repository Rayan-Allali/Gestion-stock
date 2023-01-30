-- DropForeignKey
ALTER TABLE "qteAchat" DROP CONSTRAINT "qteAchat_produitId_fkey";

-- DropForeignKey
ALTER TABLE "qteVendu" DROP CONSTRAINT "qteVendu_produitId_fkey";

-- AddForeignKey
ALTER TABLE "qteVendu" ADD CONSTRAINT "qteVendu_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "produit"("codeP") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qteAchat" ADD CONSTRAINT "qteAchat_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "produit"("codeP") ON DELETE CASCADE ON UPDATE CASCADE;
