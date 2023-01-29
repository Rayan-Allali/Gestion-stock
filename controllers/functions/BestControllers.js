import prisma from "../../lib/prisma";

export async function bestSuppliers(req,res){
   try{
    const id=req.query.id *1
    if(!id) return res.status(400).json({status:400,message:"Invalid Id"})
    const bestPointsSupllier=await prisma.pointF.findMany({
        take: 3,
        where:{
            yearP:{
                gte: new Date(
                    `${id}-01-01T00:00:00+0000`
                  ),
                  lte:new Date(
                      `${id}-12-31T00:00:00+0000`
                    ),
            }
        },
        orderBy: {
            points: 'desc',
          },
          select:{
            points,
            supplier:{
                codeF:true,
                nomF:true,
                prenomF:true,
                img:true
            }
          }
    })
    return res.status(200).json({status:200,data:bestPointsSupllier})
   }catch(err){
    console.error(err)
    return res.status(500).json({message:"an error occurred",status:500})
   }
}

export async function bestCustomers(req,res){
    try{
        const id=req.query.id *1
        if(!id) return res.status(400).json({status:400,message:"Invalid Id"})
        const bestPointsCustomer=await prisma.pointC.findMany({
            take: 3,
            where:{
                yearP:{
                    gte: new Date(
                        `${id}-01-01T00:00:00+0000`
                      ),
                      lte:new Date(
                          `${id}-12-31T00:00:00+0000`
                        ),
                }
            },
            orderBy: {
                points: 'desc',
              },
              select:{
                points,
                customer:{
                    codeC:true,
                    nomC:true,
                    prenomC:true,
                    img:true
                }
              }
        })
        return res.status(200).json({status:200,data:bestPointsCustomer})
    }catch(err){
     console.error(err)
     return res.status(500).json({message:"an error occurred",status:500})
    }
 }

 export async function bestProductVendu(req,res){
    try{
     const bestProductVendu=await prisma.produit.findMany({
         take: 3,
         orderBy: {
             qteVendu: 'desc',
           },
     })
     return res.status(200).json({status:200,data:bestProductVendu})
    }catch(err){
     console.error(err)
     return res.status(500).json({message:"an error occurred",status:500})
    }
 }

 export async function bestProductAchat(req,res){
    try{
     const bestProductAchat=await prisma.produit.findMany({
         take: 3,
         orderBy: {
             qteAchat: 'desc',
           },
     })
     return res.status(200).json({status:200,data:bestProductAchat})
    }catch(err){
     console.error(err)
     return res.status(500).json({message:"an error occurred",status:500})
    }
 }