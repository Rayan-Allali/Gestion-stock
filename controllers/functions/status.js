import prisma from "../../lib/prisma";

export async function statusYear(req,res){
   try{
    const id=req.query.id*1
    const TotalSalesYear=await prisma.achat.count({
        where:{
            DateA:{
                gte: new Date(
                  `${id}-01-01T00:00:00+0000`
                ),
                lte:new Date(
                    `${id}-12-31T00:00:00+0000`
                  ),
              },
        }
    })
    const TotalInvoicesYear=await prisma.facture.count({
       where:{
        dateF:{
            gte: new Date(
              `${id}-01-01T00:00:00+0000`
            ),
            lte:new Date(
                `${id}-12-31T00:00:00+0000`
              ),
          },
       }
    })
    
    const TotalUnpaidSalesYear=await prisma.achat.count({
        where:{
            DateA:{
                gte: new Date(
                  `${id}-01-01T00:00:00+0000`
                ),
                lte:new Date(
                    `${id}-12-31T00:00:00+0000`
                  ),
              },
              montantRestant:{
                gt:0
              }
        }
    })
    const TotalPaidSaleYear=await prisma.achat.count({
       where:{
        DateA:{
            gte: new Date(
              `${id}-01-01T00:00:00+0000`
            ),
            lte:new Date(
                `${id}-12-31T00:00:00+0000`
              ),
          },
          montantRestant:0
       }
    })
    const CostTotalSalesYear=await prisma.achat.findMany({
        where:{
            DateA:{
                gte: new Date(
                  `${id}-01-01T00:00:00+0000`
                ),
                lte:new Date(
                    `${id}-12-31T00:00:00+0000`
                  ),
              },
        }
    })
    const CostTotalInvoicesYear=await prisma.facture.findMany({
       where:{
        dateF:{
            gte: new Date(
              `${id}-01-01T00:00:00+0000`
            ),
            lte:new Date(
                `${id}-12-31T00:00:00+0000`
              ),
          },
       }
    })
    let TotalCostInvoice=0
    let TotalCostSale=0
    if(TotalInvoicesYear>0 || TotalSalesYear>0){
        if(TotalInvoicesYear>0){
            CostTotalInvoicesYear.map(invoice=>{
                TotalCostInvoice=TotalCostInvoice + invoice.TotalTtc
            })
        }
    
        if(TotalSalesYear>0){
            CostTotalSalesYear.map(sale=>{
                TotalCostSale=TotalCostSale + sale.montantTotal 
            })
        }
    }
   const TotalRevenu=TotalCostSale - TotalCostInvoice
    return res.status(200).json({status:200,data:{
        sale:TotalSalesYear,
        invoice:TotalInvoicesYear,
        UnPaidSale:TotalUnpaidSalesYear,
        paidSale:TotalPaidSaleYear,
        TotalCostInvoice,
        TotalCostSale,
        TotalRevenu
    }})
   }catch(err){
    console.error(err)
    return res.status(500).json({message:"an error occurred",status:500})
   }
}
