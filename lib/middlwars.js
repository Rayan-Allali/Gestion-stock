import { PrismaClient } from "@prisma/client";
import findProduct from "./searchObject";

const prisma=new PrismaClient();

//middlewares 
    //triggers 
    export async function createProduct(req,res){
        if(!findProduct(req.product.nomP))
        {const product=await prisma.produit.create({
            data:data.product
        })
        console.log(product)}
    }