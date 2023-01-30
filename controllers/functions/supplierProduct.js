import prisma from "../../lib/prisma"

export async function AllProductsOfSupplier(req,res){
    try{
        const id=req.query.id *1
        const AllProductsOfSupplier=await prisma.vente.findMany({
            where:{
                    fournisseur:id
            }
        })
        return res.status(200).json({
            status:300,
            data:AllProductsOfSupplier
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}