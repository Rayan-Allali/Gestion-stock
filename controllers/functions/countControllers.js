import prisma from "../../lib/prisma";

export async function countAllSupplier(req,res){
    try{
        const Countsupplier =  await prisma.fournisseur.count()
        return res.status(200).json({
            status:300,
            data:Countsupplier
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}

export async function countAllCustomer(req,res){
    try{
        const CountCustomer =  await prisma.client.count()
        return res.status(200).json({
            status:300,
            data:CountCustomer 
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}

export async function countAllInvoice(req,res){
    try{
        const CountInvoice=  await prisma.facture.count()
        return res.status(200).json({
            status:300,
            data:CountInvoice 
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}

export async function countAllPaidInvoice(req,res){
    try{
        const CountPaidInvoice=  await prisma.facture.count({
            where:{
                TotalRest:0
            }
        })
        return res.status(200).json({
            status:300,
            data:CountPaidInvoice
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}

export async function countAllUnPaidInvoice(req,res){
    try{
        const CountUnPaidInvoice=  await prisma.facture.count({
            where:{
                TotalRest:{
                    gt:0
                }
            }
        })
        return res.status(200).json({
            status:300,
            data:CountUnPaidInvoice
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}


export async function countAllSale(req,res){
    try{
        const CountSale=  await prisma.achat.count()
        return res.status(200).json({
            status:300,
            data:CountSale
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}

export async function countAllPaidSale(req,res){
    try{
        const CountPaidSale=  await prisma.achat.count({
            where:{
                montantRestant:0
            }
        })
        return res.status(200).json({
            status:300,
            data:CountPaidSale
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}

export async function countAllUnPaidSale(req,res){
    try{
        const CountUnPaidSale=  await prisma.achat.count({
            where:{
                montantRestant:{
                    gt:0
                }
            }
        })
        return res.status(200).json({
            status:300,
            data:CountUnPaidSale
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}

export async function countAllOutStock(req,res){
    try{
        const countAllOutStock=  await prisma.sortieStock.count()
        return res.status(200).json({
            status:300,
            data:countAllOutStock
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}

export async function countAllEntreStock(req,res){
    try{
        const countAllEntreStock=  await prisma.entreeStock.count()
        return res.status(200).json({
            status:300,
            data:countAllEntreStock
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}

export async function countAllProductType(req,res){
    try{
        const countAllProductType=  await prisma.typeProduit.count()
        return res.status(200).json({
            status:300,
            data:countAllProductType
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}

export async function countAllProduct(req,res){
    try{
        const countAllProduct=await prisma.produit.count()
        return res.status(200).json({
            status:300,
            data:countAllProduct
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}

export async function countAllProductOfType(req,res){
    try{
        const id=req.query.id
        const countAllProduct=await prisma.produit.count({
            where:{
                type:id
            }
        })
        return res.status(200).json({
            status:300,
            data:countAllProduct
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}

