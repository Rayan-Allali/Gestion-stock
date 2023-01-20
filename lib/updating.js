import prisma from "./prisma";

export async function  updateProductStockQte(qte,idStock,qte2,state){
const productStock=await prisma.productstock.findUnique({
where:{
    idStock
}
})
if(!productStock) return 0

if(state==="-") {
    productStock.qte=productStock.qte+qte
    await prisma.productstock.update(
        {where:{
            idStock
        },
        data:{
            qte:productStock.qte
        }},
    )
}
else{
    productStock.qte=productStock.qte +qte2
    if(qte>productStock.qte) return 1
    productStock.qte =productStock.qte-qte
    await prisma.productstock.update(
        {where:{
            idStock
        },
        data:{
            qte
        }},
    )
}

return 2
}