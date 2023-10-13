import express from "express";
import cors from "cors";
import routes from "./routers/routes";
import dotenv from 'dotenv'
import { generateDefaultKey } from "./controllers/keyGen";
import { generateSoltransaction, generateTransaction } from "./controllers/makeTransaction";
import { Keypair, PublicKey } from "@solana/web3.js";
import { decodeInstruction } from "@solana/spl-token";


const app = express()

dotenv.config()


app.use(cors())
app.use(express.json())
app.use(routes)




app.listen(4000, ()=> console.log('online'))



