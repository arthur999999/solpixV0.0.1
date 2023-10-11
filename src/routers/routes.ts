import { Router } from "express";
import { PostUrl, ParseURL } from "../controllers/trasactionRequest";


const routes = Router();

routes.post('/trasferUrl', PostUrl);
routes.post('/parseUrl', ParseURL)

export default routes;