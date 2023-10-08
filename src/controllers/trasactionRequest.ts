import axios from "axios";
import { Request, Response } from "express";

export async function PostUrl(req: Request, res: Response) {


    const {url} = req.body;

    if (!url) {
        res.status(400).send("Invalid Body");
        return;
    }

    const pubKey = "HJCP3ci2rDKZRq3nYBPjWrEgpDBqt2ah7Dv68kB7rdYn"

    const body = {
        account: pubKey
    }

    try {
        const result = await axios.post( url , body);
        res.status(200).send(result.data);
        return;
    } catch (error) {
        res.status(400).send(error)
        return;
    }
   
}