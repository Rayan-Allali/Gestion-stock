import prisma from "../lib/prisma";

export async function getAllHandler(req,res){
    try{
        const productsStock=await prisma.productstock.findMany();
    if(!productsStock)return res.status(404).json({status:404,message:"no product in stock found"})
    return res.status(200).json({
        status:200,
        data:productsStock
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
        const productstock=await prisma.productstock.findUnique({
            where:{
                idStock:id*1
            }
        });
    if(!productstock)return res.status(404).json({status:404,message:"no product in stock with that id was found"})
    return res.status(200).json({
        status:200,
        data:productstock
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({status:500,message:"an error occurred"})
    }

}
export async function postHandler(req,res){
    try{    
        const {qte,productId,prixV,prixHt}=req.body
    if(!qte || !productId || !prixV) return res.status(400).json({status:400,message:"missing data"})
    const newproductstock=await prisma.productstock.create({
        data:{
            qte,prixV,
            product:{
                connect:{
                    codeP:productId
                }
            }
        }
    });
    
    const entreeStock=await prisma.entreeStock.create({
        data:{
            qte,prixV,productstock:{
                connect:{
                    idStock:newproductstock.idStock
                }
            }
        }
    })
    return res.status(201).json({
        status:201,
        data:newproductstock
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
        const productstock=await prisma.productstock.findUnique({
            where:{
                idStock:id*1
            }
        });
    if(!productstock)return res.status(404).json({status:404,message:"no product stock with that id was found"})
    let {qte,product,prixV,prixHt}=req.body
    if(!qte && !product && !prixV) return res.status(400).json({status:400,message:"missing data"})

        if(!qte)qte=productstock.qte
        if(!product)product=productstock.produit
        if(!prixV)prixV=productstock.prixV
        if(!prixHt)prixHt=productstock.prixHt
    const productstockUpdated=await prisma.productstock.update({
        where:{
            idStock:id*1
        },
        data:{
            qte,produit:{connect:{
                codeP:product
            }},prixV,prixHt
        }
    });
    
    return res.status(200).json({
        status:200,
        data:productstockUpdated
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
        const {motif}=req.body
        if(!motif) return res.status(400).json({status:400,message:"missing data"})
        const productstock=await prisma.productstock.findUnique({
            where:{
                idStock:id*1
            }
        });
        
    if(!productstock)return res.status(404).json({status:404,message:"no productstock found"})
    const productstockDeleted=await prisma.productstock.delete({
        where:{
            idStock:id*1
        }
    });
    const sortieStock=await prisma.sortieStock.create({
        data:{
            motif,
            qte:productstock.qte,
            prixV:productstock.prixV,
            prixHt:productstock.prixHt,
            product:{
                connect:{
                    codeP:productstock.produit
                }
            }
            
        }
    })
    return res.status(204).json({
        status:204
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({status:500,message:"an error occurred"})
    }
}