import prisma from "../../lib/prisma"


export async function AllSalesOfCustomer(req,res){
    try{
        const id=req.query.id *1
        const AllSalesOfCustomer=await prisma.achat.findMany({
            where:{
                    client:id
            }
        })
        return res.status(200).json({
            status:300,
            data:AllSalesOfCustomer
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({status:500,message:"something went wrong"})
    }
}

export async function AllInvoicesOfSupplier(req,res){
    try{
        const id=req.query.id *1
        const AllInvoicesOfSupplier=await prisma.facture.findMany({
            where:{
                    fournisseur:id
            }
        })
        return res.status(200).json({
            status:300,
            data:AllInvoicesOfSupplier
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({status:500,message:"something went wrong"})
    }
}