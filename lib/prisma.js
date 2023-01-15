import { PrismaClient } from "@prisma/client";

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


//middlewares 
    //triggers 
prisma.$use(async (params, next) => {
    if (params.model == 'Post' && params.action == 'delete') {
      // Logic only runs for delete action and Post model
    }
    return next(params)
  })
export default prisma;