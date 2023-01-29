import { AllSalesOfCustomer } from "../../../../controllers/functions/purchase";

export default async function handler(req, res) {
  if (req.method === 'GET') return  AllSalesOfCustomer(req,res)
  res
    .status(400)
    .json({ status: 400, message: "we can't handle this request" });
}