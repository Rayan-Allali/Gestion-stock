import { AllInvoicesOfSupplier } from "../../../../controllers/functions/purchase";
import { AllReglementOfCustomer } from "../../../../controllers/functions/reglement";

export default async function handler(req, res) {
  if (req.method === 'GET') return AllInvoicesOfSupplier(req,res)
  res
    .status(400)
    .json({ status: 400, message: "we can't handle this request" });
}