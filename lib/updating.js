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
            const year=new Date(Date.now()).getFullYear()
            console.log(year)
            const qteVendu= await prisma.qteVendu.findFirst({
                where:{
                    yearP:{
                        gte:new Date(
                            `${year}-01-01T00:00:00+0000`
                          ),
                        lte:new Date(
                            `${year}-12-31T00:00:00+0000`
                          ),
                    },
                    produitId:product.codeP
                }
                })
                if(!qteVendu){return 0}
                let Total2=qte+0
            if(state === "-" ){ /* delete product*/
            Total=product.qteVendu - qte
            Total2=qteVendu.qte - qte
        }
        else{
            if(product.qteVendu > 0){Total=Total + product.qteVendu;
                Total2=Total2+qteVendu.qte 
            }
        }

        const updatedProduct=await prisma.produit.update({
            where:{
                codeP
            },
            data:{
                qteVendu:Total
          } 
          })  
          const updatedQteVendu=await prisma.qteVendu.update({
            where:{
                idQte:qteVendu.idQte
            },
            data:{
                qte:Total2
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
            const year=new Date(Date.now()).getFullYear()
            console.log(year)
            const qteAchat= await prisma.qteAchat.findFirst({
                where:{
                    yearP:{
                        gte:new Date(
                            `${year}-01-01T00:00:00+0000`
                          ),
                        lte:new Date(
                            `${year}-12-31T00:00:00+0000`
                          ),
                    },
                    produitId:product.codeP
                }
                })
                if(!qteAchat){return 0}
                let Total2=qte+0
            if(state === "-" ){ /* delete product*/
            Total=product.qteAchat - qte
            Total2=qteAchat.qte - qte
        }
        else{
            if(product.qteAchat > 0){Total=Total + product.qteAchat;
            Total2=Total2 +qteAchat.qte
            console.log(Total2)
            }
        }

        const updatedProduct=await prisma.produit.update({
            where:{
                codeP
            },
            data:{
                qteAchat:Total
          } 
          })
          console.log(updatedProduct)
          const updatedQteAchat=await prisma.qteAchat.update({
            where:{
                idQte:qteAchat.idQte
            },
            data:{
                qte:Total2
          } 
          }) 
          console.log(updatedQteAchat)
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
            let Total2=montant+0
            if(!sale) {return 0}
            if(state === "-" ){ /* delete sale*/
            Total=sale.montantRestant - montant
            Total2=sale.montantRestant - montant
            console.log(Total)
           const update=await Promise.resolve(UpdateCustomerCredit(montant,sale.clientId.codeC,"-"))
           if(update<2) return 1
        }
        else{
            if(sale.montantTotal > 0){Total=Total + sale.montantTotal;
                Total2=sale.montantRestant + Total2
            }
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
                    montantRestant:Total2
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
        return 2
}
catch(err){
    console.error(err)
}
}

export async function UpdateSupplierSold(montant,SupplierId,state,opr){
    try{
       
        const supplier=await prisma.fournisseur.findUnique({
            where:{
                codeF:SupplierId
            }
            })
            let Total=montant+0
            if(!supplier) {return 0}
            if(state === "-"){
                Total=supplier.sold - montant
        }
        else{
            if(supplier.sold> 0){Total=supplier.sold + montant}
        }
        if(opr === "post"){
            const updatedSupplier=await prisma.fournisseur.update({
                where:{
                  codeF:SupplierId
                },
                data:{
                  sold:Total,
                  pointF:Total
              } 
              })
              if(!updatedSupplier) return 1
        }
        else{
            const updatedSupplier=await prisma.fournisseur.update({
                where:{
                  codeF:SupplierId
                },
                data:{
                  sold:Total,
              } 
              })
              if(!updatedSupplier) return 1
        }
        
       return 2   
    }
    catch(err){
        console.error(err);
    }
    

}

export async function updatePointSupplier(date,point,SupplierId,state){
    try{
        const year=new Date(date).getFullYear()
        const PointF=await prisma.pointF.findFirst({
            where:{
                yearP:{
                    gte:new Date(
                        `${year}-01-01T00:00:00+0000`
                      ),
                    lte:new Date(
                        `${year}-12-31T00:00:00+0000`
                      ),
                },
                supplierId:SupplierId
            }
            })
            if(!PointF) {return 0}
            let pointF=point+0
            if(state === "-"){
                pointF=PointF.points  - point
        }
        else{
            if(PointF.points> 0){Total=PointF.points + point}
        }
        const updatedPointF=await prisma.pointF.update({
            where:{
                idPoint:PointF.idPoint
            },
            data:{
              points:pointF,
          } 
          })
          if(!updatedPointF) return 1
        
       return 2   
    }
    catch(err){
        console.error(err);
    }
}

export async function updatePointCustomer(date,point,CustomerId,state){
    try{
        const year=new Date(date).getFullYear()
        const PointC=await prisma.pointC.findFirst({
            where:{
                yearP:{
                    gte:new Date(
                        `${year}-01-01T00:00:00+0000`
                      ),
                    lte:new Date(
                        `${year}-12-31T00:00:00+0000`
                      ),
                },
                customer:{
                    where:{
                        codeF:CustomerId
                    }
                }
            }
            })
            if(!PointC) {return 0}
            let pointC=point+0
            if(state === "-"){
                pointC=PointC.points  - point
        }
        else{
            if(PointC.points> 0){Total=PointC.points + point}
        }
        const updatedPointC=await prisma.pointC.update({
            where:{
                idPoint:PointC.idPoint
            },
            data:{
              points:pointC,
          } 
          })
          if(!updatedPointC) return 1
        
       return 2   
    }
    catch(err){
        console.error(err);
    }
}