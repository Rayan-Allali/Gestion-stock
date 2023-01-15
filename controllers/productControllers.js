import prisma from '../lib/prisma'

//get all the products
export async function getAllHandler(req,res){
    try{
        const products=await prisma.produit.findMany();
    if(!products){
        return res.status(404).json({
            status:404,
            message:"no  products found"
        })
    }
    return res.status(200).json({
        status:200,
        data: products
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
const product=await prisma.produit.findUnique({
    where:{
        codeP:id
    }
})
if(!product) return res.status(404).json({status:404,message:"product not found"})
return res.status(200).json({status:200,data:product})
}
catch(err){
    console.error(err)
    res.status(500).json({status:500,message:"something went wrong"})
}
}

//delete a product by id

export async function deleteHandler(req,res){
    try{
        const id=req.query.id *1
        if(!id) return res.status(400).json({status:400,message:"invalid id"})
const product=await prisma.produit.findUnique({
    where:{
        codeP:id
    }
})
if(!product) return res.status(404).json({status:404,message:"product not found"})
const deletedProduct=await prisma.produit.delete({
    where:{
        codeP:id
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

//create new product 

export async function postHandler(req,res){
    try{
const {nomP,designation,type}=req.body
if(!nomP || !designation|| !type) return res.status(400).json({status:400,message:"missing data"});

const product =await prisma.produit.create({
    data:{
        nomP,designation,type, qteAchat:0,
        qteVendu:0
    }
})
if(!product )return res.status(400).json({
        status:400,
        message:"something went wrong we couldn't create new product"
    })

  return res.status(201).json({
    status:201,
    data:product
  })  
 }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}

//update product

export async function putHandler(req,res){
    try{
        const id=req.query.id *1
    if(!id){
        return res.status(400).json({
            status:400,
            message:'invalid id'
        })
    }
    let {nomP,designation,type}=req.body
    if(!nomP && !designation && type){
        return res.status(400).json({
            status:400,
            message:"missing data"
        })
    }
    
    const product=await prisma.produit.findUnique({
        where:{
            codeP:id
        }
    })
    if(!product){
        return res.status(404).json({
            status:404,
            message:'no product found'
        })
    }
    if(!nomP){
        nomP=product.nomP
    }
    if(!type){
        type=product.type
    }
    if(!designation){
        designation=product.designation
    }

    const newproduct =await prisma.produit.update({
        where:{
            codeP:id
        },
        data:{
            nomP,designation,type
        }
    })
    return res.status(200).json({
        status:200,
        data:newproduct
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred"
        })
    }
}