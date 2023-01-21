import prisma from "./prisma";

export async function UpdateSaleMontant(montant,SaleID,state){
    try{
        const sale=await prisma.achat.findUnique({
            where:{
                idAchat:SaleID
            },select:{
                clientId:{
                    select:{
                        codeC:true
                    }
                },
                montantTotal:true
            }
            })
            let Total=montant + 0
            if(!sale) {return 0}
            if(state === "-" ){ /* delete sale*/
            Total=sale.montantTotal - montant
            console.log(Total)
           const update=await Promise.resolve(UpdateCustomerCredit(Total,sale.clientId.codeC,"-")) 
           console.log("update: "+update)
           if(update===1) return 1
        }
        else{
            if(sale.montantTotal > 0){Total=Total + sale.montant}
            const update=await Promise.resolve(UpdateCustomerCredit(Total,sale.clientId.codeC,"+"))
            if(update===1) return 1
        }
        const updatedSale=await prisma.achat.update({
            where:{
                idAchat:SaleID
            },
            data:{
                montantTotal:Total,
                montantRestant:Total
          } 
          })
          if(!updatedSale) return 1
            return 2
}
    catch(err){
        console.error(err);
    }
    

}

export async function UpdateCustomerCredit(montant,customerId,state){
    try{
       
        const customer=await prisma.client.findUnique({
            where:{
                codeC:customerId
            }
            })
            let Total=montant+0
            if(!customer) return 0
            if(state === "-"){
                Total=customer.credit - montant
        }
        else{
            if(customer.credit!= 0){Total=customer.credit + montant}
        }
        const updatedCustomer=await prisma.client.update({
            where:{
              codeC:customerId
            },
            data:{
              credit:Total
          } 
          })
          if(!updatedCustomer) return 1
          console.log("3 updating cutsomer done")
       return 2   
    }
    catch(err){
        console.error(err);
    }
    

}

export async function  updateProductStockQte(qte,idStock,qte2,state){
try{
    const productStock=await prisma.productstock.findUnique({
        where:{
            idStock
        }
        })
        if(!productStock) return 0
        
        if(state==="-") {
            productStock.qte=productStock.qte+qte
            await prisma.productstock.update(
                {where:{
                    idStock
                },
                data:{
                    qte:productStock.qte
                }},
            )
        }
        else{
            productStock.qte=productStock.qte +qte2
            if(qte>productStock.qte) return 1
            productStock.qte =productStock.qte-qte
            await prisma.productstock.update(
                {where:{
                    idStock
                },
                data:{
                    qte
                }},
            )
        }
        console.log("done")
        return 2
}
catch(err){
    console.error(err)
}
}