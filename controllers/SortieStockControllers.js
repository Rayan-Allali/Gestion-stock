import prisma from "../lib/prisma";

export async function getAllHandler(req,res){
    try{
        const sortiesStock=await prisma.sortieStock.findMany();
    if(!sortiesStock)return res.status(404).json({status:404,message:"no sortiesStock found"})
    return res.status(200).json({
        status:200,
        data:sortiesStock
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
        const SortieStock=await prisma.sortieStock.findUnique({
            where:{
                idSortieStock:id*1
            }
        });
    if(!SortieStock)return res.status(404).json({status:404,message:"no SortieStock found"})
    return res.status(200).json({
        status:200,
        data:SortieStock
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({status:500,message:"an error occurred"})
    }

}
export async function postHandler(req,res){
    try{
        const {motif,qte,product,prixV,prixHt}=req.body
    if(!motif || !qte || !product || !prixV) return res.status(400).json({status:400,message:"missing data"})
    const newSortieStock=await prisma.sortieStock.create({
        data:{
            motif,qte,prixV,prixHt,
            product:{
                connect:{
                    codeP:product*1
                }
            }
        }
    });
    return res.status(201).json({
        status:201,
        data:newSortieStock
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
        const sortieStock=await prisma.sortieStock.findUnique({
            where:{
                idSortieStock:id*1
            }
        });
    if(!sortieStock)return res.status(404).json({status:404,message:"no sortieStocks found"})
    let {motif,qte,product,prixV,prixHt}=req.body
    if(!motif && !qte && !product && !prixV) return res.status(400).json({status:400,message:"missing data"})

        if(!qte)qte=sortieStock.qte
        if(!motif)motif=sortieStock.qte
        if(!product)product=sortieStock.produit
        if(!prixV)prixV=sortieStock.prixV
        if(!prixHt)prixHt=sortieStock.prixHt
    const sortieStockUpdated=await prisma.sortieStock.update({
        where:{
            idSortieStock:id*1
        },
        data:{
            motif,qte,produit:{connect:{
                codeP:product
            }},prixV,prixHt
        }
    });
    
    return res.status(200).json({
        status:200,
        data:sortieStockUpdated
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
        const sortieStock=await prisma.sortieStock.findUnique({
            where:{
                idSortieStock:id*1
            }
        });

    if(!sortieStock)return res.status(404).json({status:404,message:"no sortieStock found"})
    const newproductstock=await prisma.productstock.create({
        data:{
            qte:sortieStock.qte,
            prixV:sortieStock.prixV,
            prixHt:sortieStock.prixHt,
            product:{
                connect:{
                    codeP:sortieStock.produit
                }
            }
        }
    });
    if(!newproductstock) return res.status(400).json({status:400,message:"error creating new product in stock"})
    const sortieStockDeleted=await prisma.sortieStock.delete({
        where:{
            idSortieStock:id*1
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
