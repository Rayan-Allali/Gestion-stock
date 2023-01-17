/*
  Warnings:

  - Added the required column `img` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedDate` to the `entreeStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `fournisseur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedDate` to the `sortieStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motif` to the `sortieStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produit` to the `sortieStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qte` to the `sortieStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "client" ADD COLUMN     "img" TEXT NOT NULL,
ALTER COLUMN "teleC" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "entreeStock" ADD COLUMN     "dateE" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "fournisseur" ADD COLUMN     "img" TEXT NOT NULL,
ALTER COLUMN "teleF" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "produit" ADD COLUMN     "img" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sortieStock" ADD COLUMN     "dateE" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "motif" TEXT NOT NULL,
ADD COLUMN     "produit" INTEGER NOT NULL,
ADD COLUMN     "qte" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "sortieStock" ADD CONSTRAINT "sortieStock_produit_fkey" FOREIGN KEY ("produit") REFERENCES "produit"("codeP") ON DELETE RESTRICT ON UPDATE CASCADE;
