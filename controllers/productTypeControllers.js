import prisma from "../lib/prisma";
import { postHandler } from "./reglementSupplierControllers";

export async function getAllHandler(req,res){
    try{
        const productTypes=await prisma.typeProduit.findMany();
    if(!productTypes)return res.status(404).json({status:404,message:"no productTypes found"})
    return res.status(200).json({
        status:200,
        data:productTypes
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
        if(!id) return res.status(400).json({status:400,message:"INvalid Name"})
        const productType=await prisma.typeProduit.findUnique({
            where:{
                name:id
            }
        });
    if(!productType)return res.status(404).json({status:404,message:"no productTypes found"})
    return res.status(200).json({
        status:200,
        data:productType
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({status:500,message:"an error occurred"})
    }

}
export async function postHandler(req,res){
    try{
        const {name,designation}=req.body
    if(!name || !designation) return res.status(400).json({status:400,message:"missing data"})
    const newProductType=await prisma.typeProduit.create({
        data:{
            name,designation
        }
    });
    return res.status(201).json({
        status:201,
        data:newProductType
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
        if(!id) return res.status(400).json({status:400,message:"INvalid Name"})
        const productType=await prisma.typeProduit.findUnique({
            where:{
                name:id
            }
        });
    if(!productType)return res.status(404).json({status:404,message:"no productTypes found"})
        const {name,designation}=req.body
    if(!name && !designation) return res.status(400).json({status:400,message:"missing data"})

        if(!name)name=productType.name
        if(!designation)designation=productType.designation
    const productTypeUpdated=await prisma.typeProduit.update({
        where:{
            name:id
        },
        data:{
            name,designation
        }
    });
    
    return res.status(200).json({
        status:200,
        data:productTypeUpdated
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
        const productType=await prisma.typeProduit.findUnique({
            where:{
                name:id
            }
        });
    if(!productType)return res.status(404).json({status:404,message:"no productType found"})
    const productTypeDeleted=await prisma.typeProduit.delete({
        where:{
            name:id
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
