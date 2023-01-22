import prisma from '../lib/prisma'

export async function getAllHandler(req,res){
    
    try{ 
        const concernes=await prisma.concerne.findMany({
            select:{
                qte:true,
                product:{
                    select:{
                        codeP:true,
                        nomP:true
                    }
                },
                Commande:{
                    select:{
                        idBon:true,
                        supplier:{
                            select:{
                                codeF:true
                        }}
                    }
                }
            }
        })
        if(!concernes){
            return res.status(404).json({
                status:404,
                message:"no concerne were found"
            })
        }
        return res.status(200).json({
            status:200,
            data:concernes
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
    let id= req.query.id.split("&");
       if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
        
        const idBon=id[0]
        const codeP=id[1]
    const concerne=await prisma.concerne.findFirst({
        where:{
            produit:codeP,
            BonCommande:idBon
        },
        select:{
            qte:true,
            product:{
                select:{
                    codeP:true,
                    nomP:true
                }
            },
            Commande:{
                select:{
                    idBon:true,
                    supplier:{
                        select:{
                            codeF:true
                    }}
                }
            }
        }
    })
    if(!concerne){
        return res.status(404).json({
            status:404,
            message:"no concerne found"
        })
    }
    return res.status(200).json({
        status:200,
        data:concerne
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
const {qte,product,BonCommande}=req.body
if(!qte || !product || !BonCommande ) return res.status(400).json({status:400,message:"missing data"});
const concerne =await prisma.concerne.create({
    data:{
        qte,
        product:{
            connect:{
                codeP:product
            }
        },
        BonCommande:{
            connect:{
                idBon:BonCommande
            }
        }
    }
})
if(!concerne)return res.status(400).json({
        status:400,
        message:"something went wrong we couldn't create new concerne"
    })

  return res.status(201).json({
    status:201,
    data:concerne
  })  


    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}

//update concerne

export async function putHandler(req,res){
    try{
        let id= req.query.id.split("&");
       if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
        
        const idBon=id[0]
        const codeP=id[1]
    const concerne=await prisma.concerne.findFirst({
        where:{
            produit:codeP,
            BonCommande:idBon
        }
    })
    if(!concerne){
        return res.status(404).json({
            status:404,
            message:"no concerne found"
        })
    }
    let {qte}=req.body
    if(!qte){
        return res.status(400).json({
            status:400,
            message:"missing data"
        })
    }
    
    const newconcerne =await prisma.concerne.updateMany({
        where:{
            produit:codeP,
            BonCommande:idBon
        },
        data:{
            qte
        }
    })
    return res.status(200).json({
        status:200,
        data:newconcerne
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred"
        })
    }
}

//delete concerne by id
export async function deleteHandler(req,res){
    try {
        let id= req.query.id.split("&");
        if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
         
         const idBon=id[0]
         const codeP=id[1]
     const concerne=await prisma.concerne.findFirst({
         where:{
             produit:codeP,
             BonCommande:idBon
         }
     })
     if(!concerne){
         return res.status(404).json({
             status:404,
             message:"no concerne found"
         })
     }
        const deletedconcerne=await prisma.concerne.deleteMany({
            where:{
                produit:codeP,
                BonCommande:idBon
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
