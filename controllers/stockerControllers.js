import prisma from '../lib/prisma'
import findProduct from '../lib/searchObject'
export async function getAllHandler(req,res){
    try{
        const stockers=await prisma.stocker.findMany(
            {
                        select:{
                            product:{
                                select:{
                                    nomP:true
                                }
                            },
                            qte:true,
                            prixV:true,
                            prixHt:true,
                            facture:true
                        }
                    }
        )
        if(!stockers){
            return res.status(404).json({
                status:404,
                message:"no facture were found"
            })
        }
        return res.status(200).json({
            status:200,
            data:stockers
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
    const stocker=await prisma.stocker.findMany({
        where:{
            facture:id
        },
                include:{
                    numFacture:{
                        select:{
                            numF:true,
                        dateF:true
                        }
                    },
                    product:{
                           select: {nomP:true}
                    },
                }
            
    })
    if(!stocker){
        return res.status(404).json({
            status:404,
            message:"no stocker found"
        })
    }
    return res.status(200).json({
        status:200,
        data:stocker
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
const {qte,prixV,prixHt,product,numF}=req.body
if(!qte || !prixV || !prixHt || !product || !numF){
    return res.status(400).json({
        status:400,
        message:"missing data"
    })
}
let TotalTtc=0;
TotalTtc=TotalTtc+qte*prixV
let produit
if(!findProduct(product)){
    produit=await prisma.produit.create({
        data:{
            nomP:product.nomP,
    designation:product.designation,
    qteAchat:qte,
    qteVendu:0,
        }
    })  
}
else{
    produit=await prisma.produit.findFirst({
        where:{
            nomP:product.nomP
        }
    })
}
const stocker=await prisma.stocker.create({
    data:{
        qte,
        prixV,
        prixHt,
        idStock:{
            connect:{
                idStock:1
            } },
        numFacture:{
            connect:{
                numF
            }
        },
        product:{
            connect:{
                codeP:produit.codeP
            }
        }
    }
})

await prisma.facture.update({
    where:{
        numF
    },
    data:{
        TotalRest:TotalTtc,
        TotalTtc
    }
})

  return res.status(201).json({
    status:201,
    data:stocker
  })  
  

    }catch(err){
        console.error(err)
        
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}
export async function putHandler(req,res){
    try{
        const id=req.query.id *1
    if(!id){
        return res.status(400).json({
            status:400,
            message:'invalid id'
        })
    }
    let {nomC,prenomC,adressC,teleC}=req.body
    if(!nomC && !prenomC && !adressC && !teleC){
        return res.status(400).json({
            status:400,
            message:"missing data"
        })
    }
    
    const invoice=await prisma.facture.findUnique({
        where:{
            numF:id
        }
    })
    if(!invoice){
        return res.status(404).json({
            status:404,
            message:'no invoice found'
        })
    }
    if(!nomC){
        nomC=invoice.nomC
    }
    if(!teleC){
        teleC=invoice.teleC
    }
    if(!adressC){
        adressC=invoice.adressC
    }
    if(!prenomC){
        prenomC=invoice.prenomC
    }
    const newinvoice =await prisma.facture.update({
        where:{
            numF:id
        },
        data:{
            prenomC,nomC,teleC,adressC
        }
    })
    return res.status(200).json({
        status:200,
        data:newinvoice
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred"
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