import prisma from '../lib/prisma'

export async function getAllHandler(req,res){
    
    try{
        const customers=await prisma.client.findMany()
        if(!customers){
            return res.status(404).json({
                status:404,
                message:"no customer were found"
            })
        }
        return res.status(200).json({
            status:200,
            data:customers
        })

    }
    catch(err){
        return res.status(500).json({
            status:500,
            message:"something went wrong "
        })
    }
}