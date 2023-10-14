import { Request, Response } from "express";
import EfiPay from "sdk-typescript-apis-efi";

const options = {
    sandbox: false,
	client_id: 'Client_Id_89c29e19b8a719ce14b1d7539e56f39ddaf4bb6d',
	client_secret: 'Client_Secret_b8d216f0ffa600d3616f5d834b5a4fd466f55790',
	certificate: 'producao-502074-solpix.p12',
}

const efipay = new EfiPay(options)

export async function checkPayment(req: Request, res: Response) {
    const {txid } = req.body
    if(!txid){
        res.status(400).send("body invalid")
        return
    }

    const params = {
        txid: txid
    };

    try {
        const response = await efipay.pixDetailCharge(params)
        const responseVerifyPix = {
            status: response.status,
            valor: response.valor,
            devedor: response.devedor,
        }
        res.status(200).send(responseVerifyPix);
    } catch (error: any) {
       res.status(400).send(error)
    }

}