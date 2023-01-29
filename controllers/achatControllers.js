import prisma from '../lib/prisma'
import { UpdateCustomerCredit } from '../lib/updating';


export async function getAllHandler(req,res){
    try{
        const sales=await prisma.achat.findMany({
            select:{
                idAchat:true,
                montantTotal:true,
                montantRestant:true,
                DateA:true,
                clientId:{
                    select:{
                        codeC:true,
                        nomC:true,
                        img:true
                    }
                }
            }
        });
    if(!sales){
        return res.status(404).json({
            status:404,
            message:"no sale found"
        })
    }
    return res.status(200).json({
        status:200,
        data:sales
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
const {customerId}=req.body
if(!customerId ) return res.status(400).json({status:400,message:"missing data"});

const sale =await prisma.achat.create({
    data:{
        clientId:{
            connect:{
                codeC:customerId
            }
        },
        montantTotal:0,
         montantRestant:0
    }
})

if(!sale )return res.status(400).json({
        status:400,
        message:"something went wrong we couldn't create new sale"
    })
  return res.status(201).json({
    status:201,
    data:sale 
  })  
 }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}

export async function getHandler(req,res){
try{
    const id=req.query.id *1
if(!id) return res.status(400).json({status:400,message:"invalid id"})
const sale=await prisma.achat.findUnique({
    where:{
        idAchat:id
    },
    select:{
        idAchat:true,
        montantTotal:true,
        montantRestant:true,
        DateA:true,
        clientId:{
            select:{
                codeC:true,
                nomC:true,
                img:true
            }
        },
        reglements:{
            select:{
                idRegelementClient:true,
                paiment:true,
            }
        }
        ,transactions:{
            select:{
                numTr:true,
                qte:true,
                produitStock :{
                    select:{
                        idStock:true,
                        prixV:true,
                        product:{
                            select:{
                                codeP:true,
                                nomP:true,
                                img:true 
                            }
                        }
                    }
                }
            }
        }
                    }
})
if(!sale) return res.status(404).json({status:404,message:"sale not found"})
return res.status(200).json({status:200,data:sale})
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
const sale=await prisma.achat.findUnique({
    where:{
        idAchat:id
    }
})
if(!sale) return res.status(404).json({status:404,message:"sale not found"})
const update=await Promise.resolve(UpdateCustomerCredit(sale.montant,sale.client,"-"))
if(update === 1) return res.status(400).json({status:400,message:"we couldnt update client credit try again later"})
const deletedSuplier=await prisma.achat.delete({
    where:{
        idAchat:id
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

//update sale

export async function putHandler(req,res){
    try{
        const id=req.query.id *1
    if(!id){
        return res.status(400).json({
            status:400,
            message:'invalid id'
        })
    }
    let {nomF,prenomF,adressF,teleF}=req.body
    if(!nomF && !prenomF && !adressF && !teleF){
        return res.status(400).json({
            status:400,
            message:"missing data"
        })
    }
    
    const sale=await prisma.achat.findUnique({
        where:{
            idAchat:id
        }
    })
    if(!sale){
        return res.status(404).json({
            status:404,
            message:'no sale found'
        })
    }
    if(!nomF){
        nomF=sale.nomF
    }
    if(!teleF){
        teleF=sale.teleF
    }
    if(!adressF){
        adressF=sale.adressF
    }
    if(!prenomF){
        prenomF=sale.prenomF
    }
    const newsale =await prisma.achat.update({
        where:{
            idAchat:id
        },
        data:{
            prenomF,nomF,teleF,adressF
        }
    })
    return res.status(200).json({
        status:200,
        data:newsale
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred"
        })
    }
}