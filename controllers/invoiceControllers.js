import prisma from '../lib/prisma'
export async function getAllHandler(req,res){
    try{
        const invoices=await prisma.facture.findMany(
            {
                select:{
                    dateF:true,
                    fournisseur:true,
                    stocker:{
                        select:{
                            product:{
                                select:{
                                    nomP:true
                                }
                            },
                            qte:true,
                            prixV:true,
                            prixHt:true
                        }
                    }
                }
            }
        )
        if(!invoices){
            return res.status(404).json({
                status:404,
                message:"no facture were found"
            })
        }
        return res.status(200).json({
            status:200,
            data:invoices
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
    const invoice=await prisma.facture.findUnique({
        where:{
            numF:id
        },
        select:{
            dateF:true,
            fournisseur:true,
            stocker:{
                select:{
                    product:{
                        select:{
                            nomP:true,
                            img:true
                        }
                    },
                    qte:true,
                    prixV:true,
                    prixHt:true
                }
            },
            reglement:{
                select:{
                    montant:true
                }
            }
        }
    })
    if(!invoice){
        return res.status(404).json({
            status:404,
            message:"no facture found"
        })
    }
    return res.status(200).json({
        status:200,
        data:invoice
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
const {fournisseur}=req.body
if(!fournisseur) return res.status(400).json({status:400,message:"missing data"})
const fs=await prisma.fournisseur.findUnique({
    where:{
        codeF:fournisseur*1
    }
})
if(!fs){await prisma.fournisseur.create({
    data:{fournisseur}
})}

const invoice =await prisma.facture.create({
    data:{
        TotalTtc:0,
        TotalRest:0,
  supplier:{connect:{
    codeF:fournisseur*1
  }}
    }
})
if(!invoice)return res.status(400).json({
        status:400,
        message:"something went wrong we couldn't create new invoice"
    })
  return res.status(201).json({
    status:201,
    data:invoice
  })  
  

    }catch(err){
        console.error(err)
        
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}

export async function deleteHandler(req,res){
    try {
        const id=req.query.id*1;
        if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
        const invoice=await prisma.facture.findUnique({
            where:{
                numF:id
            }
        })
        if(!invoice) return res.status(404).json({status:404, message:"invoice not found"})
        const deletedinvoice=await prisma.facture.delete({
            where:{
                numF:id
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