-- CreateTable
CREATE TABLE "pointC" (
    "YearP" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "points" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "pointC_pkey" PRIMARY KEY ("YearP")
);

-- CreateTable
CREATE TABLE "pointF" (
    "YearP" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "points" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,

    CONSTRAINT "pointF_pkey" PRIMARY KEY ("YearP")
);

-- AddForeignKey
ALTER TABLE "pointC" ADD CONSTRAINT "pointC_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "client"("codeC") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pointF" ADD CONSTRAINT "pointF_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "fournisseur"("codeF") ON DELETE CASCADE ON UPDATE CASCADE;
