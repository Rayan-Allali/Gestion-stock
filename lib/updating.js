import prisma from "./prisma";

export async function UpdateProductQteVendu(qte,codeP,state){
    try{
        const product=await prisma.produit.findUnique({
            where:{
                codeP
            }
            })
            let Total=qte + 0
            if(!product) {return 0}
            if(state === "-" ){ /* delete product*/
            Total=product.qteVendu - qte
            console.log(Total)
        }
        else{
            if(product.qteVendu > 0){Total=Total + product.qteVendu}
        }

        const updatedProduct=await prisma.produit.update({
            where:{
                codeP
            },
            data:{
                qteVendu:Total
          } 
          })  
            return 2
}
    catch(err){
        console.error(err);
    }
    

}

export async function UpdateProductQteAchat(qte,codeP,state){
    try{
        const product=await prisma.produit.findUnique({
            where:{
                codeP
            }
            })
            let Total=qte + 0
            if(!product) {return 0}
            if(state === "-" ){ /* delete product*/
            Total=product.qteAchat - qte
            console.log(Total)
        }
        else{
            if(product.qteAchat > 0){Total=Total + product.qteAchat}
            if(update===1) return 1
        }

        const updatedProduct=await prisma.produit.update({
            where:{
                codeP
            },
            data:{
                qteAchat:Total
          } 
          })
          if(!updatedProduct) return 1        
            return 2
}
    catch(err){
        console.error(err);
    }
    

}

export async function UpdateSaleMontant(montant,SaleID,state,opr){
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
                montantTotal:true,
                montantRestant:true
            }
            })
            let Total=montant + 0
            if(!sale) {return 0}
            if(state === "-" ){ /* delete sale*/
            Total=sale.montantRestant - montant
            console.log(Total)
           const update=await Promise.resolve(UpdateCustomerCredit(montant,sale.clientId.codeC,"-"))
           if(update<2) return 1
        }
        else{
            if(sale.montantTotal > 0){Total=Total + sale.montantTotal}
            const update=await Promise.resolve(UpdateCustomerCredit(montant,sale.clientId.codeC,"+"))
            if(update===1) return 1
        }
        if(opr === "post"){
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
        }
        else{
            const updatedSale=await prisma.achat.update({
                where:{
                    idAchat:SaleID
                },
                data:{
                    montantRestant:Total
              } 
              })
              if(!updatedSale) return 1
        }
          
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
            if(!customer) {return 0}
            if(state === "-"){
                Total=customer.credit - montant
        }
        else{
            if(customer.credit> 0){Total=customer.credit + montant}
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

export async function UpdateCustomerPoint(montant,customerId,state){
    try{
       
        const customer=await prisma.client.findUnique({
            where:{
                codeC:customerId
            }
            })
            let Total=montant+0
            if(!customer) return 0
            if(state === "-"){
                Total=customer.points - montant
        }
        else{
            if(customer.pointC!= 0){Total=customer.pointC + montant}
        }
        const updatedCustomer=await prisma.client.update({
            where:{
              codeC:customerId
            },
            data:{
              pointC:Total
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

export async function  updateProductStockQte(qte,idStock,state){
try{
    const productStock=await prisma.productstock.findUnique({
        where:{
            idStock
        },
        select:{
            qte:true,
            idStock:true,
            product:{
                select:{
                    codeP:true
                }
            }
        }
        })
        if(!productStock) return 0
        let Total=qte
        if(state==="+") {
            Total=productStock.qte+qte
            if(update <2) return 1
        }
        else{
            if(qte>productStock.qte){ return 1;}
            Total =productStock.qte-qte
        }
        await prisma.productstock.update(
            {where:{
                idStock
            },
            data:{
                qte:Total
            }},
        )
        console.log("done")
        return 2
}
catch(err){
    console.error(err)
}
}