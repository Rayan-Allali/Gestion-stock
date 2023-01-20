import {getHandler,putHandler,deleteHandler} from '../../../controllers/transactionControllers'

export default async function Handler(req,res){
    if(req.method==='GET') return getHandler(req,res)
    if(req.method==='PUT') return putHandler(req,res)
    if(req.method==='DELETE') return deleteHandler(req,res)
    res.status(400).json({ status: 400, message: "we can't handle this request" });
}