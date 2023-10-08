import { Router } from "express";
import { PostUrl } from "../controllers/trasactionRequest";


const routes = Router();

routes.post('/trasferUrl', PostUrl);

export default routes;