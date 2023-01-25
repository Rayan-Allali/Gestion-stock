import prisma from '../lib/prisma'
import {  UpdateCustomerPoint, UpdateSaleMontant } from '../lib/updating';


export async function getAllHandler(req,res){
    try{
        const reglementCustomers=await prisma.regelementClient.findMany({
            select:{
                idRegelementClient:true,
                paiment:true,
                achatId:{
                    select:{
                        idAchat:true,
                        montantTotal:true,
                        montantRestant:true,
                        clientId:{
                            select:{
                                codeC:true,
                                nomC:true,
                                img:true
                            }
                        }
                    }
                }
            }
        });
    if(!reglementCustomers){
        return res.status(404).json({
            status:404,
            message:"no reglementCustomer found"
        })
    }
    return res.status(200).json({
        status:200,
        data:reglementCustomers
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
const {paiment,idAchat}=req.body
if(!paiment|| !idAchat ) return res.status(400).json({status:400,message:"missing data"});
const achat=await prisma.achat.findUnique({
    where:{
        idAchat
    },select:{
                idAchat:true,
                montantTotal:true,
                montantRestant:true,
                clientId:{
                    select:{
                        codeC:true,
                        nomC:true,
                        img:true
                    }
                }
            }
})
if(!achat) return res.status(400).json({status:400,message:"no facture with that id"});
const TotalPaiment=achat.montantRestant-paiment
if(TotalPaiment < 0) return res.status(400).json({status:400,message:"the amount you want to pay is bigger than the amount of the sale"})

const update=await Promise.resolve(UpdateSaleMontant(paiment,idAchat,"-","delete"))
if(update ===1) return res.status(400).json({status:400,message:"we couldnt update the customer and the sale montant"})
const update2=await Promise.resolve(UpdateCustomerPoint(paiment,achat.clientId.codeC,"+"))
if(update2 ===1) return res.status(400).json({status:400,message:"we couldnt update the customer points try again"})
const reglementCustomer=await prisma.regelementClient.create({
    data:{
        paiment,achatId:{
            connect:{
                idAchat
            }
        }
    }
})
if(!reglementCustomer )return res.status(400).json({
        status:400,
        message:"something went wrong we couldn't create new reglementCustomer"
    })

  return res.status(201).json({
    status:201,
    data:reglementCustomer 
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
const reglementCustomer=await prisma.regelementClient.findUnique({
    where:{
        idRegelementClient:id
    },
    select:{
        idRegelementClient:true,
        paiment:true,
        achatId:{
            select:{
                idAchat:true,
                montantTotal:true,
                montantRestant:true,
                clientId:{
                    select:{
                        codeC:true,
                        nomC:true,
                        img:true
                    }
                }
            }
        }
    }
})
if(!reglementCustomer) return res.status(404).json({status:404,message:"reglementCustomer not found"})
return res.status(200).json({status:200,data:reglementCustomer})
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
const reglementCustomer=await prisma.regelementClient.findUnique({
    where:{
        idRegelementClient:id
    },
    select:{
        idRegelementClient:true,
        paiment:true,
        achatId:{
            select:{
                idAchat:true,
                montantTotal:true,
                montantRestant:true,
                clientId:{
                    select:{
                        codeC:true,
                        nomC:true,
                        img:true
                    }
                }
            }
        }
    }
})
if(!reglementCustomer) return res.status(404).json({status:404,message:"reglementCustomer not found"})

const update=await Promise.resolve(UpdateSaleMontant(reglementCustomer.paiment,reglementCustomer.achatId.idAchat,"+","delete")) 
if(update<2) return res.status(400).json({status:400,message:"we couldnt update the customer credit and the sale montant"})
const update2=await Promise.resolve(UpdateCustomerPoint(reglementCustomer.paiment,reglementCustomer.achatId.clientId.CodeC,"-")) 
if(update2<2)return res.status(400).json({status:400,message:"we coudlnot update the customer point"})
const deletedregelementClient=await prisma.regelementClient.delete({
    where:{
        idRegelementClient:id
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

//update regelementClient

export async function putHandler(req,res){
    try{
        const id=req.query.id *1
    if(!id){
        return res.status(400).json({
            status:400,
            message:'invalid id'
        })
    }
    let {paiment}=req.body
    if(!paiment){
        return res.status(400).json({
            status:400,
            message:"missing data"
        })
    }
    
    const reglementCustomer=await prisma.regelementClient.findUnique({
        where:{
            idRegelementClient:id
        },select:{
            idRegelementClient:true,
            paiment:true,
            achatId:{
                select:{
                    idAchat:true,
                    montantTotal:true,
                    montantRestant:true,
                    clientId:{
                        select:{
                            codeC:true,
                            nomC:true,
                            img:true
                        }
                    }
                }
            }
        }
    })
    if(!reglementCustomer){
        return res.status(404).json({
            status:404,
            message:'no reglementCustomer found'
        })
    }
    const achat=await prisma.achat.findUnique({
        where:{
            idAchat:reglementCustomer
        },select:{
            idAchat:true,
            montantTotal:true,
            montantRestant:true,
            clientId:{
                select:{
                    codeC:true,
                    nomC:true,
                    img:true
                }
            }
        }
    })
     let diff=reglementCustomer.paiment - paiment
    const TotalRest=achat.montantRest + diff 
    
    if(TotalRest<0) return res.status(400).json({status:400,message:"paiment you want to add is greater than totalRest of the sale"})

    const update=await Promise.resolve(UpdateSaleMontant(diff,achat.idAchat,"+","delete"))
    if(update < 2) return res.status(400).json({status:400,message:"we couldnt update the customer credit and the sale montant try again later"})
    const update2=await Promise.resolve(UpdateCustomerPoint(diff,achat.clientId.codeC,"+"))
    if(update2 < 2) return res.status(400).json({status:400,message:"we couldnt update the customer points"})
    const newreglementCustomer =await prisma.reglementFournisseur.update({
        where:{
            idRegelementClient:id
        },
        data:{
            paiment
        }
    })
    return res.status(200).json({
        status:200,
        data:newreglementCustomer
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred"
        })
    }
}