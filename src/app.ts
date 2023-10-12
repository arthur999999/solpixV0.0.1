import express from "express";
import cors from "cors";
import routes from "./routers/routes";
import { ShowTransaction } from "./controllers/decodeTransaction";
import { PostParseURL } from "./controllers/parseURLTransaction";
import dotenv from 'dotenv'
import { CreatePix, checkThePix } from "./controllers/createPaymentsPix";
import { generateKeys } from "./controllers/keyGen";

const app = express()

dotenv.config()


app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(4000, ()=> console.log('online'))



