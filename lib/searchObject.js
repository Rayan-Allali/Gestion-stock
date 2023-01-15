import Prisma from "./prisma"


export default async function findProduct(product){
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