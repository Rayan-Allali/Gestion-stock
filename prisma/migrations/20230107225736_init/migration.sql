-- CreateTable
CREATE TABLE "client" (
    "codeC" SERIAL NOT NULL,
    "nomC" TEXT NOT NULL,
    "prenomC" TEXT NOT NULL,
    "adressC" TEXT NOT NULL,
    "teleC" INTEGER NOT NULL,
    "credit" INTEGER NOT NULL,
    "pointC" INTEGER NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("codeC")
);

-- CreateTable
CREATE TABLE "achat" (
    "idAchat" SERIAL NOT NULL,
    "montantTotal" INTEGER NOT NULL,
    "montantRestant" INTEGER NOT NULL,
    "client" INTEGER NOT NULL,

    CONSTRAINT "achat_pkey" PRIMARY KEY ("idAchat")
);

-- CreateTable
CREATE TABLE "transaction" (
    "numTr" SERIAL NOT NULL,
    "achat" INTEGER NOT NULL,
    "qte" INTEGER NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("numTr")
);

-- CreateTable
CREATE TABLE "regelementClient" (
    "idRegelementClient" SERIAL NOT NULL,
    "paiment" INTEGER NOT NULL,
    "achat" INTEGER NOT NULL,

    CONSTRAINT "regelementClient_pkey" PRIMARY KEY ("idRegelementClient")
);

-- CreateTable
CREATE TABLE "fournisseur" (
    "codeF" SERIAL NOT NULL,
    "nomF" TEXT NOT NULL,
    "prenomF" TEXT NOT NULL,
    "adressF" TEXT NOT NULL,
    "teleF" INTEGER NOT NULL,
    "sold" INTEGER NOT NULL,
    "pointF" INTEGER NOT NULL,

    CONSTRAINT "fournisseur_pkey" PRIMARY KEY ("codeF")
);

-- CreateTable
CREATE TABLE "vente" (
    "produit" INTEGER NOT NULL,
    "fournisseur" INTEGER NOT NULL,
    "prix" INTEGER NOT NULL,

    CONSTRAINT "vente_pkey" PRIMARY KEY ("produit","fournisseur")
);

-- CreateTable
CREATE TABLE "produit" (
    "codeP" SERIAL NOT NULL,
    "nomP" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "qteAchat" INTEGER NOT NULL,
    "qteVendu" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "produit_pkey" PRIMARY KEY ("codeP")
);

-- CreateTable
CREATE TABLE "typeProduit" (
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,

    CONSTRAINT "typeProduit_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "bonCommande" (
    "idBon" SERIAL NOT NULL,
    "fournisseur" INTEGER NOT NULL,

    CONSTRAINT "bonCommande_pkey" PRIMARY KEY ("idBon")
);

-- CreateTable
CREATE TABLE "concerne" (
    "qte" INTEGER NOT NULL,
    "produit" INTEGER NOT NULL,
    "BonCommande" INTEGER NOT NULL,

    CONSTRAINT "concerne_pkey" PRIMARY KEY ("BonCommande","produit")
);

-- CreateTable
CREATE TABLE "facture" (
    "numF" SERIAL NOT NULL,
    "dateF" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TotalTtc" INTEGER NOT NULL,
    "TotalRest" INTEGER NOT NULL,
    "fournisseur" INTEGER NOT NULL,

    CONSTRAINT "facture_pkey" PRIMARY KEY ("numF")
);

-- CreateTable
CREATE TABLE "stocker" (
    "produit" INTEGER NOT NULL,
    "facture" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "prixHt" INTEGER NOT NULL,
    "prixV" INTEGER NOT NULL,
    "qte" INTEGER NOT NULL,

    CONSTRAINT "stocker_pkey" PRIMARY KEY ("facture","produit")
);

-- CreateTable
CREATE TABLE "regelementFournisseur" (
    "idReg" SERIAL NOT NULL,
    "montant" INTEGER NOT NULL,
    "facture" INTEGER NOT NULL,

    CONSTRAINT "regelementFournisseur_pkey" PRIMARY KEY ("idReg")
);

-- CreateTable
CREATE TABLE "bl" (
    "id" SERIAL NOT NULL,
    "facture" INTEGER NOT NULL,
    "DateBl" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "idStock" INTEGER NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("idStock")
);

-- CreateTable
CREATE TABLE "entreeStock" (
    "idEntreeStock" SERIAL NOT NULL,

    CONSTRAINT "entreeStock_pkey" PRIMARY KEY ("idEntreeStock")
);

-- CreateTable
CREATE TABLE "sortieStock" (
    "idSortieStock" SERIAL NOT NULL,

    CONSTRAINT "sortieStock_pkey" PRIMARY KEY ("idSortieStock")
);

-- CreateIndex
CREATE UNIQUE INDEX "bl_facture_key" ON "bl"("facture");

-- AddForeignKey
ALTER TABLE "achat" ADD CONSTRAINT "achat_client_fkey" FOREIGN KEY ("client") REFERENCES "client"("codeC") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_achat_fkey" FOREIGN KEY ("achat") REFERENCES "achat"("idAchat") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regelementClient" ADD CONSTRAINT "regelementClient_achat_fkey" FOREIGN KEY ("achat") REFERENCES "achat"("idAchat") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vente" ADD CONSTRAINT "vente_produit_fkey" FOREIGN KEY ("produit") REFERENCES "produit"("codeP") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vente" ADD CONSTRAINT "vente_fournisseur_fkey" FOREIGN KEY ("fournisseur") REFERENCES "fournisseur"("codeF") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produit" ADD CONSTRAINT "produit_type_fkey" FOREIGN KEY ("type") REFERENCES "typeProduit"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bonCommande" ADD CONSTRAINT "bonCommande_fournisseur_fkey" FOREIGN KEY ("fournisseur") REFERENCES "fournisseur"("codeF") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concerne" ADD CONSTRAINT "concerne_produit_fkey" FOREIGN KEY ("produit") REFERENCES "produit"("codeP") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concerne" ADD CONSTRAINT "concerne_BonCommande_fkey" FOREIGN KEY ("BonCommande") REFERENCES "bonCommande"("idBon") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facture" ADD CONSTRAINT "facture_fournisseur_fkey" FOREIGN KEY ("fournisseur") REFERENCES "fournisseur"("codeF") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stocker" ADD CONSTRAINT "stocker_produit_fkey" FOREIGN KEY ("produit") REFERENCES "produit"("codeP") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stocker" ADD CONSTRAINT "stocker_facture_fkey" FOREIGN KEY ("facture") REFERENCES "facture"("numF") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stocker" ADD CONSTRAINT "stocker_stock_fkey" FOREIGN KEY ("stock") REFERENCES "stock"("idStock") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regelementFournisseur" ADD CONSTRAINT "regelementFournisseur_facture_fkey" FOREIGN KEY ("facture") REFERENCES "facture"("numF") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bl" ADD CONSTRAINT "bl_facture_fkey" FOREIGN KEY ("facture") REFERENCES "facture"("numF") ON DELETE RESTRICT ON UPDATE CASCADE;
