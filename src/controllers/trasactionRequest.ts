import axios from "axios";
import { Request, Response } from "express";
import { PostParseURL } from "./parseURLTransaction";
import { ShowTransaction } from "./decodeTransaction";
import { Keypair } from "@solana/web3.js";
import { CreatePix } from "./createPaymentsPix";
import { existTransferPayment } from "./performSolanaPayment";

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

    const keys = Keypair.generate()

    const body = {
        account: keys.publicKey.toString()
    }

    try {
        const result = await axios.post( url , body);
        const transaction = result.data.transaction
        const {trasnsac, trasactionDetails, valueDecoded} = await ShowTransaction(transaction);
        const pix = await CreatePix(300, cpf, name, valueDecoded )
        res.status(200).send(pix);
        const keyPairUser = Keypair.generate()
        await existTransferPayment(trasnsac, pix.responsePix.txid, keyPairUser, valueDecoded)
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

    PostParseURL(url)
}