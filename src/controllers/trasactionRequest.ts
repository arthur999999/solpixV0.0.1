import axios from "axios";
import { Request, Response } from "express";
import { PostParseURL } from "./parseURLTransaction";
import { ShowTransaction } from "./decodeTransaction";
import { Keypair } from "@solana/web3.js";
import { CreatePix } from "./createPaymentsPix";
import { existTransferPayment, verifyTransferPayment } from "./performSolanaPayment";
import { generateDefaultKey } from "./keyGen";

export async function PostUrl(req: Request, res: Response) {


    const {url, name, cpf} = req.body;

    if (!url || (typeof url) !== "string") {
        res.status(400).send("Invalid Body");
        return;
    }
    if (!name || (typeof name) !== "string") {
        res.status(400).send("Invalid Body");
        return;
    }

    if (!cpf || (typeof name) !== "string") {
        res.status(400).send("Invalid Body");
        return;
    }

    const keyPairUser = generateDefaultKey()

    const body = {
        account: keyPairUser.publicKey.toString()
    }

    try {
        const result = await axios.post( url , body);
        const transaction = result.data.transaction
        const {trasnsac, trasactionDetails, valueDecoded} = await ShowTransaction(transaction, keyPairUser);
        const pix = await CreatePix(300, cpf, name, valueDecoded )
        res.status(200).send(pix);
        await existTransferPayment(trasnsac, pix.responsePix.txid, keyPairUser)
        return;
    } catch (error: any) {
        res.status(400).send(error.message)
        return;
    }
   
}

export async function ParseURL(req: Request, res: Response) {
    const {url, name, cpf} = req.body;

    if (!url || (typeof url) !== "string") {
        res.status(400).send("Invalid Body");
        return;
    }

    if (!name || (typeof name) !== "string") {
        res.status(400).send("Invalid Body");
        return;
    }

    if (!cpf || (typeof name) !== "string") {
        res.status(400).send("Invalid Body");
        return;
    }
    const keyPairUser = generateDefaultKey()

    try {
        const parsedUrl = PostParseURL(url)
        if(!parsedUrl.amount){
            res.status(400).send("no amount")
            return
        }
        let value: number = parsedUrl.amount?.toNumber()
        const pix = await CreatePix(300, cpf, name, value)
        res.status(200).send(pix);
        await verifyTransferPayment(pix.responsePix.txid, parsedUrl, keyPairUser)
        
    } catch (error) {
        console.log(error)
    }

    
}