import prisma from '../lib/prisma'

export async function getAllHandler(req,res){
    
    try{ 
        const contients=await prisma.contient.findMany({
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
        if(!contients){
            return res.status(404).json({
                status:404,
                message:"no contient were found"
            })
        }
        return res.status(200).json({
            status:200,
            data:contients
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
        
        const idBon=id[0]*1
        const codeP=id[1]*1
    const contient=await prisma.contient.findFirst({
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
    if(!contient){
        return res.status(404).json({
            status:404,
            message:"no contient found"
        })
    }
    return res.status(200).json({
        status:200,
        data:contient
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
const contient =await prisma.contient.create({
    data:{
        qte,
        product:{
            connect:{
                codeP:product
            }
        },
        Commande:{
            connect:{
                idBon:BonCommande
            }
        }
    }
})
if(!contient)return res.status(400).json({
        status:400,
        message:"something went wrong we couldn't create new contient"
    })

  return res.status(201).json({
    status:201,
    data:contient
  })  


    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}

//update contient

export async function putHandler(req,res){
    try{
        let id= req.query.id.split("&");
       if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
        
        const idBon=id[0]*1
        const codeP=id[1]*1
    const contient=await prisma.contient.findFirst({
        where:{
            produit:codeP,
            BonCommande:idBon
        }
    })
    if(!contient){
        return res.status(404).json({
            status:404,
            message:"no contient found"
        })
    }
    let {qte}=req.body
    if(!qte){
        return res.status(400).json({
            status:400,
            message:"missing data"
        })
    }
    
    const newcontient =await prisma.contient.updateMany({
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
        data:newcontient
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred"
        })
    }
}

//delete contient by id
export async function deleteHandler(req,res){
    try {
        let id= req.query.id.split("&");
        if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
         
         const idBon=id[0]*1
         const codeP=id[1]*1
     const contient=await prisma.contient.findFirst({
         where:{
             produit:codeP,
             BonCommande:idBon
         }
     })
     if(!contient){
         return res.status(404).json({
             status:404,
             message:"no contient found"
         })
     }
        const deletedcontient=await prisma.contient.deleteMany({
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
