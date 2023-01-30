import { AllUnPaidInvoices } from "../../../controllers/functions/stat";


export default async function handler(req, res) {
  if (req.method === 'GET') return AllUnPaidInvoices(req,res)
  res
    .status(400)
    .json({ status: 400, message: "we can't handle this request" });
}