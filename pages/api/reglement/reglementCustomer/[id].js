import { AllReglementOfCustomer } from "../../../../controllers/functions/reglement";

export default async function handler(req, res) {
  if (req.method === 'GET') return AllReglementOfCustomer(req,res)
  res
    .status(400)
    .json({ status: 400, message: "we can't handle this request" });
}