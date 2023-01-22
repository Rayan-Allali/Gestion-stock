import {getHandler,deleteHandler} from '../../../controllers/blControllers'

export default async function Handler(req,res){
    if(req.method==='GET') return getHandler(req,res)
    if(req.method==='DELETE') return deleteHandler(req,res)
    res.status(400).json({ status: 400, message: "we can't handle this request" });
}