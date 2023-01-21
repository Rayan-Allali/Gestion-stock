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

export async function postHandler(req,res){
    try{
const {nomF,adressF,prenomF,teleF,img}=req.body
if(!nomF || !adressF || !teleF || !prenomF || !img) return res.status(400).json({status:400,message:"missing data"});
const pointF=0;
const sold=0;
const supplier =await prisma.fournisseur.create({
    data:{
        nomF,adressF,prenomF,teleF,pointF,sold,img
    }
})
if(!supplier )return res.status(400).json({
        status:400,
        message:"something went wrong we couldn't create new supplier"
    })

  return res.status(201).json({
    status:201,
    data:supplier 
  })  
 }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}

//add new supplier

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

console.log(update)
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

//update supplier

export async function putHandler(req,res){
    try{
        const id=req.query.id *1
    if(!id){
        return res.status(400).json({
            status:400,
            message:'invalid id'
        })
    }
    let {nomF,prenomF,adressF,teleF}=req.body
    if(!nomF && !prenomF && !adressF && !teleF){
        return res.status(400).json({
            status:400,
            message:"missing data"
        })
    }
    
    const supplier=await prisma.fournisseur.findUnique({
        where:{
            codeF:id
        }
    })
    if(!supplier){
        return res.status(404).json({
            status:404,
            message:'no supplier found'
        })
    }
    if(!nomF){
        nomF=supplier.nomF
    }
    if(!teleF){
        teleF=supplier.teleF
    }
    if(!adressF){
        adressF=supplier.adressF
    }
    if(!prenomF){
        prenomF=supplier.prenomF
    }
    const newsupplier =await prisma.fournisseur.update({
        where:{
            codeF:id
        },
        data:{
            prenomF,nomF,teleF,adressF
        }
    })
    return res.status(200).json({
        status:200,
        data:newsupplier
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred"
        })
    }
}