import prisma from "../../lib/prisma";

export async function AllPaidInvoices(req,res){
   try{
    const AllPaidInvoices=await prisma.facture.findMany({
        where:{
            TotalRest:0
        }
    })
    
    return res.status(200).json({status:200,data:AllPaidInvoices})
   }catch(err){
    console.error(err)
    return res.status(500).json({message:"an error occurred",status:500})
   }
}


export async function AllPaidSales(req,res){
    try{
     const AllPaidSales=await prisma.achat.findMany({
         where:{
            montantRestant:0
         }
     })
     
     return res.status(200).json({status:200,data:AllPaidSales})
    }catch(err){
     console.error(err)
     return res.status(500).json({message:"an error occurred",status:500})
    }
 }

 export async function AllUnPaidInvoices(req,res){
    try{
     const AllUnPaidInvoices=await prisma.facture.findMany({
         where:{
             TotalRest:{
                gt:0
             }
         }
     })
     
     return res.status(200).json({status:200,data:AllUnPaidInvoices})
    }catch(err){
     console.error(err)
     return res.status(500).json({message:"an error occurred",status:500})
    }
 }
 
 
 export async function AllUnPaidSales(req,res){
     try{
      const AllUnPaidSales=await prisma.achat.findMany({
          where:{
             montantRestant:{gt:0}
          }
      })
      
      return res.status(200).json({status:200,data:AllUnPaidSales})
     }catch(err){
      console.error(err)
      return res.status(500).json({message:"an error occurred",status:500})
     }
  }