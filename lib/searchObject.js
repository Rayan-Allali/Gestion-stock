import { prisma } from "@prisma/client";
import Prisma from "./prisma"


export async function findProduct(product){
if(!product.id){
    const obj=await Prisma.produit.findFirst({
        where:{
            nomP:product.nomP
        }
    })
    if(!obj){
        return false;
    }
}
const obj=await Prisma.produit.findUnique({
    where:{
       codeP:product.codeP * 1
    }
})
if(!obj){
    return false;
}
return true
}

export async function mergeStock(codeP,prixHt,prixV,qte){
const stocker=await prisma.stocker.findUnique(
    {where:{
        produit:codeP,
        prixHt,prixV
    }}
)
if(!stocker) return false;
qte=stocker.qte+qte
const updatedStock=await prisma.stocker.update({
    where:{
        produit:codeP,
        prixHt,prixV
    },
    data:{
        qte 
    }

})
return true
}