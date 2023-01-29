import prisma from '../lib/prisma'
import { UpdateProductQteVendu, UpdateSaleMontant, updateProductStockQte } from '../lib/updating';
export async function getAllHandler(req,res){
    try{
        const transactions=await prisma.transaction.findMany({
            select:{
                numTr:true,
                achatId:{
                   select:{
                    idAchat:true
                   }
                },
                qte:true,
                produitStock:{
                    select:{
                        idStock:true,
                        prixV:true,
                    product:{
                        select:{
                            nomP:true,
                            img:true
                        }
                    }
                    }
                }
            }
        });
    if(!transactions){
        return res.status(404).json({
            status:404,
            message:"no transaction found"
        })
    }
    return res.status(200).json({
        status:200,
        data:transactions
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
const {qte,idStock,idAchat}=req.body
if(!qte || !idStock ||!idAchat) return res.status(400).json({status:400,message:"missing data"});
const transaction =await prisma.transaction.create({
    data:{
        qte,
        produitStock:{
            connect:{
                idStock
            }
        },
        achatId:{
            connect:{
                idAchat
            }
        }
    },select:{
        numTr:true,
        achatId:{
           select:{
            idAchat:true
           }
        },
        qte:true,
        produitStock:{
            select:{
                idStock:true,
                prixV:true,
            product:{
                select:{
                    nomP:true,
                    img:true,
                    codeP:true
                }
            }
            }
        }
    }
})
const update= await Promise.resolve(updateProductStockQte(qte,idStock,"-"))
if(update === 0) return res.status(404).json({status:400,message:"no product in stock with that id"})
 
if(update === 1)return res.status(400).json({status:400,message:"This product's quantity is less than the amount you wish to extract."})

const montant=qte * transaction.produitStock.prixV
console.log(montant)
const update2=UpdateSaleMontant(montant,idAchat,"+","post")
if(update2 ===0) return res.status(400).json({status:400,message:"we couldnt update the customer credit and the sale montant no sale found"})
if(update2 ===1) return res.status(400).json({status:400,message:"we couldnt update the customer credit and the sale montant "})
const update3=await Promise.resolve(UpdateProductQteVendu(qte,transaction.produitStock.product.codeP,"+"))
if(update3 <2) return res.status(400).json({status:400,message:"we couldnt update the qteVendu of the product "})
return res.status(201).json({
    status:201,
    data:transaction 
  })  
 }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}

//add new transaction

export async function getHandler(req,res){
try{
    const id=req.query.id *1
if(!id) return res.status(400).json({status:400,message:"invalid id"})
const transaction=await prisma.transaction.findUnique({
    where:{
        numTr :id
    },
    select:{
        numTr:true,
        achatId:{
           select:{
            idAchat:true
           }
        },
        qte:true,
        produitStock:{
            select:{
                idStock:true,
            product:{
                select:{
                    nomP:true,
                    img:true
                }
            }
            }
        }
    }
})
if(!transaction) return res.status(404).json({status:404,message:"transaction not found"})
return res.status(200).json({status:200,data:transaction})
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
const transaction=await prisma.transaction.findUnique({
    where:{
        numTr:id
    },
    select:{
        numTr:true,
        achat:true,
         qte:true,
        produitStock:{
            select:{
                idStock:true,
                prixV:true,
            product:{
                select:{
                    nomP:true,
                    img:true,
                    codeP:true
                }
            }
            }
        }
    }
})


if(!transaction) return res.status(404).json({status:404,message:"transaction not found"})
const update= await Promise.resolve(updateProductStockQte(transaction.qte,transaction.produitStock.idStock,"+"))
if(update === 0)  return res.status(404).json({status:404,message:"transaction not found"})
const montant=transaction.qte * transaction.produitStock.prixV
const update2=UpdateSaleMontant(montant,transaction.achat,"-","post")
if(update2 ===1) return res.status(400).json({status:400,message:"we couldnt update the customer credit and the sale montant "})
const update3=await Promise.resolve(UpdateProductQteVendu(qte,transaction.productStock.product.codeP,"-"))
if(update3 ===1) return res.status(400).json({status:400,message:"we couldnt update the cuqte vendu of the product"})
const deletedTransaction=await prisma.transaction.delete({
    where:{
        numTr:id
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

//update transaction

export async function putHandler(req,res){
    try{
        const id=req.query.id *1
    if(!id){
        return res.status(400).json({
            status:400,
            message:'invalid id'
        })
    }
    let {qte}=req.body
    if(!qte){
        return res.status(400).json({
            status:400,
            message:"missing data"
        })
    }
    
    const transaction=await prisma.transaction.findUnique({
        where:{
            numTr:id
        },
        select:{
            numTr:true,
            achatId:{
               select:{
                idAchat:true
               }
            },
            qte:true,
            produitStock:{
                select:{
                    idStock:true,
                    prixV:true,
                product:{
                    select:{
                        nomP:true,
                        img:true,
                        codeP:true
                    }
                }
                }
            }
        }
    })
    if(!transaction){
        return res.status(404).json({
            status:404,
            message:'no transaction found'
        })
    }
    const productStock=await prisma.productstock.findUnique({
        where:{
            idStock:transaction.productStock
        }
    })
    const qte2= productStock.qte - qte
    if(qte2 < 0) return res.status(400).json({status:400,message:"quantity is out of range"})

    const update= await Promise.resolve(updateProductStockQte(qte,productStock.idStock,"-"))
    if(update === 1) return res.status(400).json({status:400,message:"This product's quantity is less than the amount you wish to extract."}) 
    const newtransaction =await prisma.transaction.update({
        where:{
            numTr:id
        },
        data:{
            qte
        }
    })
    qte=transaction.qte - newtransaction.qte
    let update2
    let update3
    if(qte>0){
        const montant=qte * transaction.produitStock.prixV
        update2=UpdateSaleMontant(montant,idAchat,"+","post")
        update3=await Promise.resolve(UpdateProductQteVendu(qte,transaction.productStock.product.codeP,"+"))    

    }
    else{
        const montant=-qte * transaction.produitStock.prixV
        update2=UpdateSaleMontant(montant,idAchat,"-","post")
        update3=await Promise.resolve(UpdateProductQteVendu(qte,transaction.productStock.product.codeP,"-"))    

    }
    
if(update2 ===1) return res.status(400).json({status:400,message:"we couldnt update the customer credit and the sale montant "})
if(update3 ===1) return res.status(400).json({status:400,message:"we couldnt update the qteVendu of the product"})

return res.status(200).json({
        status:200,
        data:newtransaction
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred"
        })
    }
}