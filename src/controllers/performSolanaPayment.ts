import { Transaction } from "@solana/web3.js";
import { CreatePix } from "./createPaymentsPix";

export async function existTransferPayment(transaction: Transaction, transactDetails: any, valueDecoded: number, cpf: string, fullname: string) {

    try {
        const pix = CreatePix(300, cpf, fullname, valueDecoded )
        let payed = false
        while(payed == false) {
            
        }
    } catch (e) {
        
    }


}