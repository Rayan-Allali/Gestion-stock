import prisma from "../../lib/prisma"


export async function LowOnstock(req,res){
    try{
        const productStock=  await prisma.productstock.count({
            where:{
                qte:{
                    lte:10
                }
            }
        })
        return res.status(200).json({
            status:300,
            data:productStock
        })
    }catch(err){
        console.error(err)
        return res.status.json({status:500,message:"something went wrong"})
    }
}