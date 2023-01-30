-- CreateTable
CREATE TABLE "qteVendu" (
    "idQte" SERIAL NOT NULL,
    "qte" INTEGER NOT NULL DEFAULT 0,
    "yearP" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produitId" INTEGER NOT NULL,

    CONSTRAINT "qteVendu_pkey" PRIMARY KEY ("idQte")
);

-- CreateTable
CREATE TABLE "qteAchat" (
    "idQte" SERIAL NOT NULL,
    "qte" INTEGER NOT NULL DEFAULT 0,
    "yearP" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produitId" INTEGER NOT NULL,

    CONSTRAINT "qteAchat_pkey" PRIMARY KEY ("idQte")
);

-- AddForeignKey
ALTER TABLE "qteVendu" ADD CONSTRAINT "qteVendu_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "produit"("codeP") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qteAchat" ADD CONSTRAINT "qteAchat_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "produit"("codeP") ON DELETE RESTRICT ON UPDATE CASCADE;
