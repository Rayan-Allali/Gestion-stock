import {getAllHandler} from '../../../controllers/customerControllers.js'

export default async function handler(req, res) {
  if (req.method === 'GET') return getAllHandler(req, res);
  res
    .status(400)
    .json({ status: 400, message: "we can't handle this request" });
}