import { Router } from "express";
import { PostUrl, ParseURL } from "../controllers/trasactionRequest";
import { checkPayment } from "../controllers/checkPayment";


const routes = Router();

routes.post('/trasferUrl', PostUrl);
routes.post('/parseUrl', ParseURL);
routes.post('/verifyPayment', checkPayment)

export default routes;