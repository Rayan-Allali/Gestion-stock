import prisma from '../lib/prisma'
import { UpdateSaleMontant, updateProductStockQte } from '../lib/updating';
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
                    img:true
                }
            }
            }
        }
    }
})
const update= await Promise.resolve(updateProductStockQte(qte,idStock,0,"+"))
if(update === 0) return res.status(404).json({status:400,message:"no product in stock with that id"})

if(update === 1)return res.status(400).json({status:400,message:"This product's quantity is less than the amount you wish to extract."})

const montant=qte * transaction.produitStock.prixV
console.log(montant)
const update2=UpdateSaleMontant(montant,idAchat,"+")
if(update2 ===0) return res.status(400).json({status:400,message:"we couldnt update the customer credit and the sale montant no sale found"})
if(update2 ===1) return res.status(400).json({status:400,message:"we couldnt update the customer credit and the sale montant "})
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
        achat:true,
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
})
if(!transaction) return res.status(404).json({status:404,message:"transaction not found"})
console.log(transaction.produitStock.idStock)
const update= await Promise.resolve(updateProductStockQte(transaction.qte,transaction.produitStock.idStock,0,"-"))
if(update === 0)  return res.status(404).json({status:404,message:"transaction not found"})
const montant=transaction.qte * transaction.produitStock.prixV
console.log(montant)
const update2=UpdateSaleMontant(montant,transaction.achat,"-")
if(update2 ===1) return res.status(400).json({status:400,message:"we couldnt update the customer credit and the sale montant "})
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
    const update= await Promise.resolve(updateProductStockQte(qte,productStock.idStock,productStock.qte,"+"))
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
    if(qte>0){
        const montant=qte * transaction.produitStock.prixV
        update2=UpdateSaleMontant(montant,idAchat,"+")
    }
    else{
        const montant=-qte * transaction.produitStock.prixV
        update2=UpdateSaleMontant(montant,idAchat,"-")
    }
    
if(update2 ===1) return res.status(400).json({status:400,message:"we couldnt update the customer credit and the sale montant "})
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