import prisma from '../lib/prisma'
import { UpdateSupplierSold } from '../lib/updating';

export async function getAllHandler(req,res){
    try{
        const reglementsuppliers=await prisma.regelementFournisseur.findMany({
            select:{
                idReg:true,
                montant:true,
                numFacture:{
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
                }
            }
        });
    if(!reglementsuppliers){
        return res.status(404).json({
            status:404,
            message:"no reglementsupplier found"
        })
    }
    return res.status(200).json({
        status:200,
        data:reglementsuppliers
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
const {numF,montant}=req.body
if(!numF || !montant ) return res.status(400).json({status:400,message:"missing data"});
const facture=await prisma.facture.findUnique({
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
if(!facture) return res.status(400).json({status:400,message:"no facture with that id"});
const TotalRest=facture.TotalRest-montant
if(TotalRest<0) return res.status(400).json({status:400,message:"the reglement amount must be less than the total Rest of the facture"})
const Updatedfacture=await prisma.facture.update({
    where:{
        numF
    },
    data:{
        TotalRest
    }
})
const update=await Promise.resolve(UpdateSupplierSold(montant,facture.supplier.codeF,"-","delete"))
if(update<2) return res.status(400).json({status:400,message:"we couldnt update the suppliersold"})
const reglementsupplier =await prisma.regelementFournisseur.create({
    data:{
        montant,numFacture:{
            connect:{
                numF
            }
        }
    }
})
if(!reglementsupplier )return res.status(400).json({
        status:400,
        message:"something went wrong we couldn't create new supplier"
    })

  return res.status(201).json({
    status:201,
    data:reglementsupplier
  })  
 }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}

//add new reglementsupplier

export async function getHandler(req,res){
try{
    const id=req.query.id *1
if(!id) return res.status(400).json({status:400,message:"invalid id"})
const reglementsupplier=await prisma.regelementFournisseur.findUnique({
    where:{
        idReg :id,
        select:{
            idReg:true,
            montant:true,
            numFacture:{
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
            }
        }
    }
})
if(!reglementsupplier) return res.status(404).json({status:404,message:"reglementsupplier not found"})
return res.status(200).json({status:200,data:reglementsupplier})
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
const reglementSupplier=await prisma.regelementFournisseur.findUnique({
    where:{
        idReg:id
    }, select:{
        idReg:true,
        montant:true,
        numFacture:{
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
        }
    }
})
if(!reglementSupplier) return res.status(404).json({status:404,message:"reglementSupplier not found"})
const invoice=await prisma.facture.findUnique({
    where:{
        numF:reglementSupplier.numFacture.numF
    },
    select:{
        supplier:{
            select:{
                codeF:true
            }
        },
        TotalRest:true,
        TotalTtc:true,
        numF:true
    }
})
if(!invoice) return res.status(404).json({status:404,message:"no invoice found"})
const TotalRest= invoice.TotalRest + reglementSupplier.montant
const updatedInvoice=await prisma.facture.update({
    where:{
        numF:invoice.numF
    },
    data:{
        TotalRest
    }
})
if(!updatedInvoice) return res.status(400).json({status:400,message:"we couldnt update the invoice "})
const update=await Promise.resolve(UpdateSupplierSold(reglementSupplier.montant,invoice.supplier.codeF,"+","delete"))
if(update<2) return res.status(400).json({status:400,message:"we couldnt update the supplier sold"})
const deletedreglementFournisseur=await prisma.regelementFournisseur.delete({
    where:{
        idReg:id
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

//update reglementFournisseur

export async function putHandler(req,res){
    try{
        const id=req.query.id *1
    if(!id){
        return res.status(400).json({
            status:400,
            message:'invalid id'
        })
    }
    let {montant}=req.body
    if(!montant){
        return res.status(400).json({
            status:400,
            message:"missing data"
        })
    }
    
    const reglementsupplier=await prisma.regelementFournisseur.findUnique({
        where:{
            idReg:id
        },
        select:{
            idReg:true,
            montant:true,
            numFacture:{
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
            }
        }
    })
    if(!reglementsupplier){
        return res.status(404).json({
            status:404,
            message:'no reglementsupplier found'
        })
    }
    const facture=await prisma.facture.findUnique({
        where:{
            numF:reglementsupplier.numFacture.numF
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
    
    const diff=reglementsupplier.montant - montant
    if(-diff>facture.TotalRest)return res.status(400).json({status:400,message:"amount you want to add is bigger then the facture total rest"})
    const TotalRest=facture.TotalRest +diff
    const updat=await Promise.resolve(UpdateSupplierSold(diff,facture.supplier.codeF,"+","delete"))
    if(updat <2)return res.status(400).json({status:400,message:"we couldnt update supplier sold"})
    const Updatedfacture=await prisma.facture.update({
        where:{
            numF:facture.numF
        },
        data:{
            TotalRest
        }
    })
    if(!Updatedfacture) return res.status(400).json({status:400,message:"we couldnt update the facture"})
    const newreglementsupplier =await prisma.regelementFournisseur.update({
        where:{
            idReg:id
        },
        data:{
            montant
        }
    })
    return res.status(200).json({
        status:200,
        data:newreglementsupplier
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred"
        })
    }
}