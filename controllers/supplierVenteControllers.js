import prisma from '../lib/prisma'
export async function getAllHandler(req,res){
    try{
        const  supplierVentes=await prisma.vente.findMany({
            select:{
            product:{
                select:{
                    codeP:true,
                    img:true,
                    nomP:true
                }
            },
        supplier:{
            select:{
                codeF:true,
                img:true,
                nomF:true
            }
        },
        prix:true
            }
        });
    if(! supplierVentes){
        return res.status(404).json({
            status:404,
            message:"no  supplierVente found"
        })
    }
    return res.status(200).json({
        status:200,
        data: supplierVentes
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
const {codeP,codeF,prix}=req.body
if(!codeP || !codeF || !prix) return res.status(400).json({status:400,message:"missing data"});
const  supplierVente =await prisma.vente.create({
    data:{
        prix,
        supplier:{
            connect:{
                codeF
            }
        },
        product:{
            connect:{
                codeP
            }
        }
    }
})
if(!supplierVente )return res.status(400).json({
        status:400,
        message:"something went wrong we couldn't create new  supplierVente"
    })

  return res.status(201).json({
    status:201,
    data: supplierVente 
  })  
 }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}

//add new  supplierVente

export async function getHandler(req,res){
try{
    let id= req.query.id.split("&");
if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
 
 const codeF=id[0]
 const codeP=id[1]
const  supplierVente=await prisma.vente.findUnique({
    where:{
        codeF,codeP
    },
    select:{
        product:{
            select:{
                codeP:true,
                img:true,
                nomP:true
            }
        },
    supplier:{
        select:{
            codeF:true,
            img:true,
            nomF:true
        }
    },
    prix:true
        }
})
if(!supplierVente) return res.status(404).json({status:404,message:" supplierVente not found"})
return res.status(200).json({status:200,data: supplierVente})
}
catch(err){
    console.error(err)
    res.status(500).json({status:500,message:"something went wrong"})
}
}
export async function deleteHandler(req,res){
    try{
        let id= req.query.id.split("&");
if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
 const codeF=id[0]
 const codeP=id[1]
const  supplierVente=await prisma.vente.findUnique({
    where:{
        codeF,
        codeP
    }
})
if(!supplierVente) return res.status(404).json({status:404,message:" supplierVente not found"})
const deletedSupplierVente=await prisma.vente.delete({
    where:{
        codeF,
        codeP
    }
})

return res.status(204).json({
    status:204
})}catch(err){
        console.error(err)
        return res.status(500).json({status:500,message:"an error occurred"})
    }
}

//update  supplierVente

export async function putHandler(req,res){
    try{
    let id= req.query.id.split("&");
    if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
    const codeF=id[0]
    const codeP=id[1]
    if(!id){
        return res.status(400).json({
            status:400,
            message:'invalid id'
        })
    }
    let {prix}=req.body
    if(!prix){
        return res.status(400).json({
            status:400,
            message:"missing data"
        })
    }
    
    const  supplierVente=await prisma.vente.findUnique({
        where:{
            codeF,codeP
        }
    })
    if(!supplierVente){
        return res.status(404).json({
            status:404,
            message:'no  supplierVente found'
        })
    }
    
    const newsupplierVente =await prisma.vente.update({
        where:{
            codeF,codeP
        },
        data:{
            prix
        }
    })
    return res.status(200).json({
        status:200,
        data:newsupplierVente
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred"
        })
    }
}