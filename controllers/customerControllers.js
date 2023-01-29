import prisma from '../lib/prisma'

export async function getAllHandler(req,res){
    
    try{ 
        const customers=await prisma.client.findMany()
        if(!customers){
            return res.status(404).json({
                status:404,
                message:"no customer were found"
            })
        }
        return res.status(200).json({
            status:200,
            data:customers
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
    const customer=await prisma.client.findUnique({
        where:{
            codeC:id
        }
    })
    if(!customer){
        return res.status(404).json({
            status:404,
            message:"no client found"
        })
    }
    return res.status(200).json({
        status:200,
        data:customer
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
const {nomC,adressC,prenomC,teleC,img}=req.body
if(!nomC || !adressC || !teleC || !prenomC ||!img) return res.status(400).json({status:400,message:"missing data"});
const pointC=0;
const credit=0;
const customer =await prisma.client.create({
    data:{
        nomC,prenomC,teleC,adressC,pointC,credit,img
    }
})
if(!customer)return res.status(400).json({
        status:400,
        message:"something went wrong we couldn't create new customer"
    })
    const PointC=await prisma.pointC.create({
       data:{
        points:0,
        customer:{
            connect:{
                codeC:customer.codeC
            }
        }
       }
    })
  return res.status(201).json({
    status:201,
    data:customer
  })  


    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"something went wrong"
        })
    }
}

//update customer

export async function putHandler(req,res){
    try{
        const id=req.query.id *1
    if(!id){
        return res.status(400).json({
            status:400,
            message:'invalid id'
        })
    }
    let {nomC,prenomC,adressC,teleC}=req.body
    if(!nomC && !prenomC && !adressC && !teleC){
        return res.status(400).json({
            status:400,
            message:"missing data"
        })
    }
    
    const customer=await prisma.client.findUnique({
        where:{
            codeC:id
        }
    })
    if(!customer){
        return res.status(404).json({
            status:404,
            message:'no customer found'
        })
    }
    if(!nomC){
        nomC=customer.nomC
    }
    if(!teleC){
        teleC=customer.teleC
    }
    if(!adressC){
        adressC=customer.adressC
    }
    if(!prenomC){
        prenomC=customer.prenomC
    }
    const newCustomer =await prisma.client.update({
        where:{
            codeC:id
        },
        data:{
            prenomC,nomC,teleC,adressC
        }
    })
    return res.status(200).json({
        status:200,
        data:newCustomer
    })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            status:500,
            message:"an error occurred"
        })
    }
}

//delete customer by id
export async function deleteHandler(req,res){
    try {
        const id=req.query.id*1;
        if(!id)return res.status(400).json({status:400, message:"Invalid Id"})
        const customer=await prisma.client.findUnique({
            where:{
                codeC:id
            }
        })
        if(!customer) return res.status(404).json({status:404, message:"Customer not found"})
        const deletedCustomer=await prisma.client.delete({
            where:{
                codeC:id
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
