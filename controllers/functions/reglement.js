import prisma from "../../lib/prisma"


export async function AllReglementOfCustomer(req,res){
    try{
        const id=req.query.id *1
        const AllReglementOfCustomer=await prisma.regelementClient.findMany({
            where:{
                achatId:{
                    client:id
                }
            }
        })
        return res.status(200).json({
            status:300,
            data:AllReglementOfCustomer
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}

export async function AllReglementOfSupplier(req,res){
    try{
        const id=req.query.id *1
        const AllReglementOfSupplier=await prisma.regelementFournisseur.findMany({
            where:{
                numFacture:{
                    fournisseur:id
                }
            }
        })
        return res.status(200).json({
            status:300,
            data:AllReglementOfSupplier
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}