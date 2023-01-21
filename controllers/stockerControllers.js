import prisma from '../lib/prisma'
import {findProduct,mergeStock} from '../lib/searchObject'
import { UpdateSupplierSold,updateProductStockQte,UpdateProductQteAchat} from '../lib/updating'
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
        const stocker=await prisma.stocker.findFirst({
            where:{
                facture:numF*1,
                produit:codeP*1,
            },include:{
                numFacture:{
                    select:{
                        numF:true,
                    dateF:true
                    }
                },
                product:{
                       select: {nomP:true,img:true,codeP:true},
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
const invoice=await prisma.facture.findUnique({
    where:{
        numF
    },
    select:{
        numF:true,
        supplier:{
            select:{
                codeF:true
            }
        },
        TotalTtc:true,
        TotalRest:true
        
    }
})
if(!invoice) return res.status(404).json({status:404,mesage:"there is no invoice with this id"})
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
        
        
        let TotalTtc
        if(invoice.TotalTtc === 0){TotalTtc=qte * prixHt}
        else{TotalTtc=invoice.TotalTtc + qte * prixHt}
        console.log(TotalTtc)
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
        const montant=qte * prixHt
        const update=await Promise.resolve(UpdateSupplierSold(montant,invoice.supplier.codeF,"+","post"))
        if(update<2)return res.status(400).json({status:400,message:"we couldnt update supplier sold"})
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
    const stocker=await prisma.stocker.findFirst({
        where:{
            facture:numF,
            produit:codeP
        }
    })
    if(!stocker){
        return res.status(404).json({
            status:404,
            message:'no stocker found'
        })
    }
    const invoice=await prisma.facture.findUnique({
        where:{
            numF:numF*1
        },
        select:{
            numF:true,
            supplier:{
                select:{
                    codeF:true
                }
            },
            TotalTtc:true,
            TotalRest:true
            
        }
    })
    let TotalTtc=invoice.TotalTtc - stocker.qte * stocker.prixV
    let TotalRest=invoice.TotalTtc - stocker.qte * stocker.prixV
    if(qte && prixV){
        TotalTtc= TotalTtc + qte * prixV
        TotalRest= TotalRest + qte * prixV
        const updatedInvoice=await prisma.facture.update({
            where:{
                numF
            },
            data:{
                TotalRest,
                TotalTtc
            }
        })
        if(!updatedInvoice) return res.status(400).json({status:400,message:"we couldnt update the invoice"})
        const qte2=stocker.qte - qte
       const update=await Promise.resolve(UpdateProductQteAchat(qte2,codeP,"+"))
       if(update<2) return res.status(400).json({status:400,message:"we couldnt update the product qteachat"})
    }
    else if(qte && !prixV){
        TotalTtc= TotalTtc + qte * stocker.prixV
        TotalRest= TotalRest + qte * stocker.prixV
        const updatedInvoice=await prisma.facture.update({
            where:{
                numF
            },
            data:{
                TotalRest,
                TotalTtc
            }
        })
        if(!updatedInvoice) return res.status(400).json({status:400,message:"we couldnt update the invoice"})
        const qte2=stocker.qte - qte
       const update=await Promise.resolve(UpdateProductQteAchat(qte2,codeP,"+"))
       if(update<2) return res.status(400).json({status:400,message:"we couldnt update the product qteachat"})
    }
    else if(!qte && prixV){
        TotalTtc= TotalTtc + stocker.qte * prixV
        TotalRest= TotalRest + stocker.qte * prixV
        const updatedInvoice=await prisma.facture.update({
            where:{
                numF
            },
            data:{
                TotalRest,
                TotalTtc
            }
        })
    }

    if(qte && prixHt){
        const montant=qte*prixHt
       const total= stocker.qte * stocker.prixHt - montant  
        const update=await Promise.resolve(UpdateSupplierSold(total,facture.supplier.codeF,"+","post"))
        if(update<2) return res.status(400).json({status:400,message:"we couldnt update the supplier sold"})
    }
    else if(!qte && prixHt){
        const montant=qte*prixHt
        const total= qte * stocker.prixHt - montant  
         const update=await Promise.resolve(UpdateSupplierSold(total,facture.supplier.codeF,"+","post"))
         if(update<2) return res.status(400).json({status:400,message:"we couldnt update the supplier sold"})
    }
    else if(!qte && prixHt){
        const montant=qte*prixHt
        const total= stocker.qte *prixHt - montant  
         const update=await Promise.resolve(UpdateSupplierSold(total,facture.supplier.codeF,"+","post"))
         if(update<2) return res.status(400).json({status:400,message:"we couldnt update the supplier sold"})
    }
    
    const productstock=await prisma.productstock.findFirst(
        {where:{
            prixV:stocker.prixV,
            prixHt:stocker.prixHt,
            produit:codeP
        }}
    )
    if(!productstock) return res.status(400).json({status:400,message:"product is not in stock"})

    if(!qte){
        qte=stocker.qte
    }
    if(!prixV){
        prixV=stocker.prixV
    }
    if(!prixHt){
       prixHt=stocker.prixHt
    }
   const qte3=stocker.qte - qte
   if(qte3 != 0){
const update=await Promise.resolve(updateProductStockQte(qte3,productstock.idStock,"+"))
if(update <2) return res.status(400).json({status:400,message:"we couldnt update the product stuck qte"})
    
   }
   const updatedstock=prisma.productstock.update({
    where:{
        idStock:productstock.idStock
    },
    data:{
        prixHt,
        prixV
    }
})
if(!updatedstock) return res.status(400).json({status:400,message:"we couldnt update the product stuck qte"})
    const newstocker =await prisma.stocker.updateMany({
        where:{
            facture:numF,
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
        const stocker=await prisma.stocker.findFirst({
            where:{
                facture:numF*1,
                produit:codeP*1
            }
        })
        if(!stocker) return res.status(404).json({status:404, message:"stocker not found"})
        const invoice=await prisma.facture.findUnique({
            where:{
                numF:numF*1
            },
            select:{
                numF:true,
                supplier:{
                    select:{
                        codeF:true
                    }
                },
                TotalTtc:true,
                TotalRest:true
                
            }
        })

        const montant=stocker.qte * stocker.prixHt
        const TotalTtc=invoice.TotalTtc - montant
        const TotalRest=invoice.TotalRest - montant
        const updateinvoice=await prisma.facture.update({
            where:{
                numF:numF*1
            },
            data:{
                TotalRest,
                TotalTtc
            }
        })
        if(!updateinvoice) return res.status(400).json({status:400,message:"we couldnt update the invoice total rest and totalttc"})
        const productstock=await prisma.productstock.findFirst(
            {where:{
                prixV:stocker.prixV,
                prixHt:stocker.prixHt,
                produit:codeP*1
            }}
        )
        if(!productstock)return res.status(400).json({status:400,message:"we couldnt update the productstuck qte"})
        const update1=await Promise.resolve(updateProductStockQte(stocker.qte,productstock.idStock,"-")) 
       if(update1<2) return res.status(400).json({status:400,message:"we couldnt update the productstuck qte"})
        const update=await Promise.resolve(UpdateSupplierSold(montant,invoice.supplier.codeF,"-","post"))
        if(update<2)return res.status(400).json({status:400,message:"we couldnt update supplier sold"})
        const deletedstocker=await prisma.stocker.deleteMany({
            where:{
                facture:numF*1,
                produit:codeP*1
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