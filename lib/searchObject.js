import prisma from "./prisma";
export async function findProduct(product){
if(!product.id){
    const obj=await prisma.produit.findFirst({
        where:{
            nomP:product.nomP
        }
    })
    if(!obj){
        return false;
    }
}
const obj=await prisma.produit.findUnique({
    where:{
       codeP:product
    }
})
if(!obj){
    return false;
}
return true
}

export async function mergeStock(codeP,prixHt,prixV,qte){

const productStock=await prisma.productstock.findFirst({
    where:{
        produit:codeP,
        prixHt,prixV
    },})
    
if(!productStock) return false;
    qte+=productStock.qte
const updatedProductStock=await prisma.productstock.update({
    where:{
        idStock:productStock.idStock
    },
    data:{
        qte 
    }

})
console.log("yoooooooooooooooo")
return true
}