import { countAllProductOfType } from "../../../../controllers/functions/countControllers";

export default async function handler(req,res){
    if(req.method === 'GET') return countAllProductOfType(req,res)
    return res.status(400).json({ status: 400, message: "we can't handle this request" });
}