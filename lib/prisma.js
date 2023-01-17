import { PrismaClient } from "@prisma/client";
import { createProduct } from "./middlwars";

let prisma

if(process.env.NODE_ENV === 'production'){
prisma=new PrismaClient()
}
else{
    if(!global.prisma){
        global.prisma=new PrismaClient()
    }
    prisma=global.prisma
}


export default prisma;