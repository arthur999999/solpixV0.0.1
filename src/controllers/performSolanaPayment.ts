import { Keypair, Transaction } from "@solana/web3.js";
import {  checkThePix } from "./createPaymentsPix";
import createURLtx, { generateSoltransaction, generateTransaction, signAndSend } from "./makeTransaction";
import { generateDefaultKey } from "./keyGen";
import { TransferRequestURL } from "@solana/pay";

export async function existTransferPayment(transaction: Transaction, txid: string, keypairUser: Keypair) {

    try {
        
        let payed = false
        let closed = 0
        let confirmPayed = false
        const interval = setInterval(check, 5000)

        async function check() {
            if(confirmPayed){
                clearInterval(interval)
                return;
            }
            const response = await checkThePix(txid)
            if(response?.status == 'CONCLUIDA' ){
                        payed = true;
                        
            }
            closed = closed + 1
            if(payed) {
                clearInterval(interval)
                const transaction3 = await signAndSend(transaction, keypairUser)
                console.log ({ transaction3: transaction3 }) 
                confirmPayed = true
                return
                
            }
            if(closed > 60 || payed) {
                clearInterval(interval)
            }
        }
        
        return
    } catch (e) {
        console.log(e)
    }


}

export async function verifyTransferPayment(txid: string , url: TransferRequestURL, keypairUser: Keypair) {

    try {

        let payed = false
        let closed = 0
        let confirmPayed = false
        const interval = setInterval(check, 5000)

        async function check() {
            if(confirmPayed){
                clearInterval(interval)
                return;
            }
            const response = await checkThePix(txid)
            if(response?.status == 'CONCLUIDA' ){
                        payed = true;
                        
            }
            closed = closed + 1
            if(payed) {
                clearInterval(interval)
                const transaction3 = await createURLtx( keypairUser , url)
                console.log ({ transaction3: transaction3 }) 
                confirmPayed = true
                return
                
            }
            if(closed > 60 || payed) {
                clearInterval(interval)
            }
        }
        
        return
    } catch (error) {
        console.log(error)
    }
   
}