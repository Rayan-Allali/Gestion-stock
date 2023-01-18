import prisma from '../lib/prisma'
export async function getAllHandler(req,res){
    try{
        const regelementsuppliers=await prisma.regelementFournisseur.findMany();
    if(!regelementsuppliers){
        return res.status(404).json({
            status:404,
            message:"no regelementsupplier found"
        })
    }
    return res.status(200).json({
        status:200,
        data:regelementsuppliers
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
    }
})
if(!facture) return res.status(400).json({status:400,message:"no facture with that id"});
const TotalRest=montant+facture.montantRest
const Updatedfacture=await prisma.facture.update({
    where:{
        numF
    },
    data:{
        TotalRest
    }
})
const regelementsupplier =await prisma.regelementFournisseur.create({
    data:{
        montant,numFacture:{
            connect:{
                numF
            }
        }
    }
})
if(!regelementsupplier )return res.status(400).json({
        status:400,
        message:"something went wrong we couldn't create new supplier"
    })

  return res.status(201).json({
    status:201,
    data:supplier 
  })  
 }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}

//add new regelementsupplier

export async function getHandler(req,res){
try{
    const id=req.query.id *1
if(!id) return res.status(400).json({status:400,message:"invalid id"})
const regelementsupplier=await prisma.regelementFournisseur.findUnique({
    where:{
        idReg :id
    }
})
if(!regelementsupplier) return res.status(404).json({status:404,message:"regelementsupplier not found"})
return res.status(200).json({status:200,data:regelementsupplier})
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
    }
})
if(!reglementSupplier) return res.status(404).json({status:404,message:"reglementSupplier not found"})
const deletedregelementFournisseur=await prisma.regelementFournisseur.delete({
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

//update regelementFournisseur

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
    
    const regelementsupplier=await prisma.regelementFournisseur.findUnique({
        where:{
            idReg:id
        }
    })
    if(!regelementsupplier){
        return res.status(404).json({
            status:404,
            message:'no regelementsupplier found'
        })
    }
    const facture=await prisma.facture.findUnique({
        where:{
            numF
        }
    })
    const TotalRest=facture.montantRest -regelementsupplier.montant + montant
    const Updatedfacture=await prisma.facture.update({
        where:{
            numF
        },
        data:{
            TotalRest
        }
    })
    const newregelementsupplier =await prisma.reglementFournisseur.update({
        where:{
            idReg:id
        },
        data:{
            numF,montant
        }
    })
    return res.status(200).json({
        status:200,
        data:newregelementsupplier
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred"
        })
    }
}