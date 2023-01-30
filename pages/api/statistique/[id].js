import { statusYear } from "../../../controllers/functions/status";

export default async function Handler(req,res){
    if(req.method==='GET') return statusYear(req,res)
    res.status(400).json({ status: 400, message: "we can't handle this request" });
}