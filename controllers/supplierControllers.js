import prisma from '../lib/prisma'
export async function getAllHandler(req,res){
    try{
        const suppliers=await prisma.fournisseur.findMany();
    if(!suppliers){
        return res.status(404).json({
            status:404,
            message:"no supplier found"
        })
    }
    return res.status(200).json({
        status:200,
        data:suppliers
    })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred"
        })
    }
}
export async function getHandler(req,res){
try{
    const id=req.query.id *1
if(!id) return res.status(400).json({status:400,message:"invalid id"})
const supplier=await prisma.fournisseur.findUnique({
    where:{
        codeF:id
    }
})
if(!supplier) return res.status(404).json({status:404,message:"supplier not found"})
return res.status(200).json({status:200,data:supplier})
}
catch(err){
    console.error(err)
    res.status(500).json({status:500,message:"something went wrong"})
}
}
export async function deleteHandler(req,res){
    try{
        const id=req.query.id *1
        if(!id) return res.status(400).json({status:400,message:"invalid id"})
const supplier=await prisma.fournisseur.findUnique({
    where:{
        codeF:id
    }
})
if(!supplier) return res.status(404).json({status:404,message:"supplier not found"})
const deletedSuplier=await prisma.fournisseur.delete({
    where:{
        codeF:id
    }
})
return res.status(204).json({
    status:204
})


    }catch(err){
        console.error(err)
        return res.status(500).json({status:500,message:"an error occurred"})
    }
}