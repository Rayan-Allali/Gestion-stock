import prisma from "../lib/prisma";

export async function getAllHandler(req,res){
    try{
        const entreesStock=await prisma.entreeStock.findMany();
    if(!entreesStock)return res.status(404).json({status:404,message:"no sortiesStock found"})
    return res.status(200).json({
        status:200,
        data:entreesStock
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({status:500,message:"an error occurred"})
    }

}

export async function getHandler(req,res){
    try{
        const {id}=req.query
        if(!id) return res.status(400).json({status:400,message:"INvalid id"})
        const entreeStock=await prisma.entreeStock.findUnique({
            where:{
                idEntreeStock:id*1
            }
        });
    if(!entreeStock)return res.status(404).json({status:404,message:"no entreeStock found"})
    return res.status(200).json({
        status:200,
        data:entreeStock
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({status:500,message:"an error occurred"})
    }

}

export async function putHandler(req,res){
    try{
        const {id}=req.query
        if(!id) return res.status(400).json({status:400,message:"INvalid id"})
        const entreeStock=await prisma.entreeStock.findUnique({
            where:{
                idEntreeStock:id*1
            }
        });
    if(!entreeStock)return res.status(404).json({status:404,message:"no entreeStocks found"})
    let {qte,prixV}=req.body
    if( !qte && !prixV) return res.status(400).json({status:400,message:"missing data"})

        if(!qte)qte=entreeStock.qte
        if(!prixV)prixV=entreeStock.prixV
    const entreeStockUpdated=await prisma.entreeStock.update({
        where:{
            idEntreeStock:id*1
        },
        data:{
            qte,prixV
        }
    });
    
    return res.status(200).json({
        status:200,
        data:entreeStockUpdated
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({status:500,message:"an error occurred"})
    }
}

export async function deleteHandler(req,res){
    try{
        const {id}=req.query
        if(!id) return res.status(400).json({status:400,message:"INvalid Name"})
        const EntreeStock=await prisma.entreeStock.findUnique({
            where:{
                idEntreeStock:id*1
            }
        });

    if(!EntreeStock)return res.status(404).json({status:404,message:"no EntreeStock found"})
    const productstock=await prisma.productstock.findUnique({
        where:{
            idStock:EntreeStock.produit
        }
    })
    if(!productstock) return res.status(400).json({status:400,message:"error finding product in stock"})
    if(productstock.qte < EntreeStock.qte) return res.status(400).json({status:400,data:"it impossible to delete this Entre of stock because some of the qte has already been sold"})
  const qte= productstock.qte - EntreeStock.qte
    const updateProductStock=await prisma.productstock.update({
        where:{
            idStock:EntreeStock.produit
        },
        data:{
            qte
        }
    })
    const EntreeStockDeleted=await prisma.entreeStock.delete({
        where:{
            idEntreeStock:id*1
        }
    });
    
    

    return res.status(204).json({
        status:204
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({status:500,message:"an error occurred"})
    }
}
