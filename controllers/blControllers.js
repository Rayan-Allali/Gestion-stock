import prisma from '../lib/prisma'
export async function getAllHandler(req,res){
    
    try{ 
        const Bls=await prisma.bl.findMany({
            select:{
                id:true,
                DateBl:true,
                facture:true,
                numFacture:{
                    select:{
                        numF:true,
                        TotalTtc:true,
                        TotalRest:true
                    }
                }
            }
        })
        if(!Bls){
            return res.status(404).json({
                status:404,
                message:"no Bl were found"
            })
        }
        return res.status(200).json({
            status:200,
            data:Bls
        })

    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"something went wrong "
        })
    }
}
export async function getHandler(req,res){
   try{
    const id=req.query.id * 1
    if(!id){
        return res.status(400).json({
            status:400,
            message:"invalid id"
        })
    }
    const Bl=await prisma.bl.findUnique({
        where:{
           id
        },
        select:{
            id:true,
            DateBl:true,
            numFacture:{
                select:{
                    numF:true,
                    TotalTtc:true,
                    TotalRest:true
                }
            }
        }
    })
    if(!Bl){
        return res.status(404).json({
            status:404,
            message:"no bl found"
        })
    }
    return res.status(200).json({
        status:200,
        data:Bl
    })
   }
   catch(err){
    console.error(err)
    return res.status(500).json({
        status:500,
        message:"something went wrong"
    })
   }
}
export async function postHandler(req,res){
    try{
const {numF}=req.body
if(!numF) return res.status(400).json({status:400,message:"missing data"});
const Bl =await prisma.bl.create({
    data:{
       numFacture:{
        connect:{
            numF
        }
       }
    }
})
if(!Bl)return res.status(400).json({
        status:400,
        message:"something went wrong we couldn't create new Bl"
    })

  return res.status(201).json({
    status:201,
    data:Bl
  })  


    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}


export async function deleteHandler(req,res){
    try {
        const id=req.query.id*1;
        if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
        const Bl=await prisma.bl.findUnique({
            where:{
                id
            }
        })
        if(!Bl) return res.status(404).json({status:404, message:"Bl not found"})
        const deletedBl=await prisma.bl.delete({
            where:{
                id
            }
        })
        res.status(204).json({status:204})

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}
