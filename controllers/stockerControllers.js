import prisma from '../lib/prisma'
import {findProduct,mergeStock} from '../lib/searchObject'
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
    let id= req.query.id.split("&");
       if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
        
        const numF=id[0]
        const codeP=id[1]
        const stocker=await prisma.stocker.findUnique({
            where:{
                facture:numF*1,
                produit:codeP*1
            },include:{
                numFacture:{
                    select:{
                        numF:true,
                    dateF:true
                    }
                },
                product:{
                       select: {nomP:true,img:true},
                },
            }
        })
        if(!stocker) return res.status(404).json({status:404, message:"stocker not found"})
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
let produit
const ir=await Promise.resolve(findProduct(product))
    if(!ir){
       produit= await prisma.produit.create({
            data:{
                img:product.img,
                nomP:product.nomP,
                designation:product.designation,
                qteAchat:qte,
                typeproduit:{
                    connect:{
                        name:product.type
                    }
                }
            }
        })
    }
    else{
        produit=await prisma.produit.findUnique({
            where:{
                codeP:product
            }
        })
        
        const qte2=qte +produit.qteAchat
        const updatedProduit=await prisma.produit.update({
            where:{
                codeP:product
            },
            data:{
                qteAchat:qte2
            }
        })
    }
    const check=await Promise.resolve(mergeStock(produit.codeP,prixHt,prixV,qte)) 
        
        const invoice=await prisma.facture.findUnique({
            where:{
                numF
            }
        })
        let TotalTtc=invoice.TotalTtc + qte * prixHt
        await prisma.facture.update({
            where:{
                numF
            },
            data:{
                TotalTtc,
                TotalRest:TotalTtc
            }
        })
        if(!check){  
           const productStock= await prisma.productstock.create({
                data:{
                    qte,prixV,prixHt,
                    product:{
                        connect:{
                            codeP:produit.codeP
                        }
                    }
                }
            });
        }

const stocker=await prisma.stocker.create({
    data:{
        qte,
        prixV,
        prixHt,
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
return res.status(201).json({
    status:201,
    data:stocker
  })


}catch(err){
        console.error(err)
        
        return res.status(500).json({
            status:500,
            message:"something went very wrong"
        })
    }
}

export async function putHandler(req,res){
    try{
        let id= req.query.id.split("&");
       if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
        
        const numF=id[0]*1
        const codeP=id[1]*1
    let {qte,prixV,prixHt}=req.body
    if(!prixV && !prixHt && !qte){
        return res.status(400).json({
            status:400,
            message:"missing data"
        })
    }
    const stocker=await prisma.stocker.findUnique({
        where:{
            numF:numF,
            produit:codeP
        }
    })
    i
    if(!stocker){
        return res.status(404).json({
            status:404,
            message:'no stocker found'
        })
    }
    if(!qte){
        qte=stocker.qte
    }
    if(!prixV){
        prixV=stocker.prixV
    }
    if(!prixHt){
       prixHt=stocker.prixHt
    }
    const newstocker =await prisma.stocker.update({
        where:{
            numF:numF,
            produit:codeP
        },
        data:{
           qte,prixHt,prixV
        }
    })
    return res.status(200).json({
        status:200,
        data:newstocker
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
       let id= req.query.id.split("&");
       if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
        
        const numF=id[0]
        const codeP=id[1]
        const stocker=await prisma.stocker.findUnique({
            where:{
                facture:numF,
                produit:codeP
            }
        })
        if(!stocker) return res.status(404).json({status:404, message:"stocker not found"})
        const deletedstocker=await prisma.stocker.delete({
            where:{
                facture:numF,
                produit:codeP
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