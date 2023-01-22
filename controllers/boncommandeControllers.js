import prisma from '../lib/prisma'
export async function getAllHandler(req,res){
    
    try{ 
        const BonCommandes=await prisma.bonCommande.findMany({
            select:{
                idBon:true,
                supplier:{
                    select:{
                        codeF:true,
                        nomF:true
                    }
                },
                concernes:{
                    select:{
                        qte:true,
                product:{
                    select:{
                        codeP:true,
                        nomP:true
                    }
                }
                    }
                }
            }
        })
        if(!BonCommandes){
            return res.status(404).json({
                status:404,
                message:"no BonCommande were found"
            })
        }
        return res.status(200).json({
            status:200,
            data:BonCommandes
        })

    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"something went wrong "
        })
    }
}
export async function getHandler(req,res){
   try{
    const id=req.query.id * 1
    if(!id){
        return res.status(400).json({
            status:400,
            message:"invalid id"
        })
    }
    const BonCommande=await prisma.bonCommande.findUnique({
        where:{
            idBon:id
        },
        select:{
            idBon:true,
            supplier:{
                select:{
                    codeF:true,
                    nomF:true
                }
            },
            concernes:{
                select:{
                    qte:true,
            product:{
                select:{
                    codeP:true,
                    nomP:true
                }
            }
                }
            }
        }
    })
    if(!BonCommande){
        return res.status(404).json({
            status:404,
            message:"no bonCommande found"
        })
    }
    return res.status(200).json({
        status:200,
        data:BonCommande
    })
   }
   catch(err){
    console.error(err)
    return res.status(500).json({
        status:500,
        message:"something went wrong"
    })
   }
}
export async function postHandler(req,res){
    try{
const {supplier}=req.body
if(!supplier) return res.status(400).json({status:400,message:"missing data"});
const BonCommande =await prisma.bonCommande.create({
    data:{
       supplier:{
        connect:{
            codeF:supplier
        }
       }
    }
})
if(!BonCommande)return res.status(400).json({
        status:400,
        message:"something went wrong we couldn't create new BonCommande"
    })

  return res.status(201).json({
    status:201,
    data:BonCommande
  })  


    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}

//update BonCommande

export async function putHandler(req,res){
    try{
        const id=req.query.id *1
    if(!id){
        return res.status(400).json({
            status:400,
            message:'invalid id'
        })
    }
    let {supplier}=req.body
    if(!supplier){
        return res.status(400).json({
            status:400,
            message:"missing data"
        })
    }
    
    const BonCommande=await prisma.bonCommande.findUnique({
        where:{
            idBon:id
        }
    })
    if(!BonCommande){
        return res.status(404).json({
            status:404,
            message:'no BonCommande found'
        })
    }
    const newBonCommande =await prisma.bonCommande.update({
        where:{
            idBon:id
        },
        data:{
            supplier:{
                connect:{
                    codeF:supplier
                }
            }
        }
    })
    return res.status(200).json({
        status:200,
        data:newBonCommande
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred"
        })
    }
}

//delete BonCommande by id
export async function deleteHandler(req,res){
    try {
        const id=req.query.id*1;
        if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
        const BonCommande=await prisma.bonCommande.findUnique({
            where:{
                idBon:id
            }
        })
        if(!BonCommande) return res.status(404).json({status:404, message:"BonCommande not found"})
        const deletedBonCommande=await prisma.bonCommande.delete({
            where:{
                idBon:id
            }
        })
        res.status(204).json({status:204})

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}
