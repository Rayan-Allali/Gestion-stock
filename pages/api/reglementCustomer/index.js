import {getAllHandler,postHandler} from '../../../controllers/reglementCustomerControllers.js'

export default async function handler(req, res) {
  if (req.method === 'GET') return getAllHandler(req, res);
  if(req.method === 'POST') return postHandler(req, res);
  res
    .status(400)
    .json({ status: 400, message: "we can't handle this request" });
}