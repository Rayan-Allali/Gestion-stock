import prisma from "../../lib/prisma";

export async function bestSuppliers(req,res){
   try{
    const bestSuppliers=await prisma.fournisseur.findMany({
        take: 3,
        orderBy: {
            pointF: 'desc',
          },
    })
    return res.status(200).json({status:200,data:bestSuppliers})
   }catch(err){
    console.error(err)
    return res.status(500).json({message:"an error occurred",status:500})
   }
}

export async function bestCustomers(req,res){
    try{
     const bestCustomers=await prisma.client.findMany({
         take: 3,
         orderBy: {
             pointC: 'desc',
           },
     })
     return res.status(200).json({status:200,data:bestCustomers})
    }catch(err){
     console.error(err)
     return res.status(500).json({message:"an error occurred",status:500})
    }
 }

 export async function bestProductVendu(req,res){
    try{
     const bestProductVendu=await prisma.produit.findMany({
         take: 3,
         orderBy: {
             qteVendu: 'desc',
           },
     })
     return res.status(200).json({status:200,data:bestProductVendu})
    }catch(err){
     console.error(err)
     return res.status(500).json({message:"an error occurred",status:500})
    }
 }

 export async function bestProductAchat(req,res){
    try{
     const bestProductAchat=await prisma.produit.findMany({
         take: 3,
         orderBy: {
             qteAchat: 'desc',
           },
     })
     return res.status(200).json({status:200,data:bestProductAchat})
    }catch(err){
     console.error(err)
     return res.status(500).json({message:"an error occurred",status:500})
    }
 }