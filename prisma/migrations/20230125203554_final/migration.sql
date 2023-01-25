-- DropForeignKey
ALTER TABLE "achat" DROP CONSTRAINT "achat_client_fkey";

-- DropForeignKey
ALTER TABLE "facture" DROP CONSTRAINT "facture_fournisseur_fkey";

-- DropForeignKey
ALTER TABLE "regelementClient" DROP CONSTRAINT "regelementClient_achat_fkey";

-- DropForeignKey
ALTER TABLE "stocker" DROP CONSTRAINT "stocker_facture_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_achat_fkey";

-- AddForeignKey
ALTER TABLE "achat" ADD CONSTRAINT "achat_client_fkey" FOREIGN KEY ("client") REFERENCES "client"("codeC") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_achat_fkey" FOREIGN KEY ("achat") REFERENCES "achat"("idAchat") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regelementClient" ADD CONSTRAINT "regelementClient_achat_fkey" FOREIGN KEY ("achat") REFERENCES "achat"("idAchat") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facture" ADD CONSTRAINT "facture_fournisseur_fkey" FOREIGN KEY ("fournisseur") REFERENCES "fournisseur"("codeF") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stocker" ADD CONSTRAINT "stocker_facture_fkey" FOREIGN KEY ("facture") REFERENCES "facture"("numF") ON DELETE CASCADE ON UPDATE CASCADE;
