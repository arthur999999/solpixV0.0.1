import { Keypair, Transaction } from "@solana/web3.js";
import {  checkThePix } from "./createPaymentsPix";
import { generateSoltransaction, generateTransaction, signAndSend } from "./makeTransaction";
import { generateDefaultKey } from "./keyGen";

export async function existTransferPayment(transaction: Transaction, txid: string, keypairUser: Keypair, value: number) {

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
                const keyPairPayer = generateDefaultKey()
                const transaction1 = await generateSoltransaction( keypairUser.publicKey, 0.0009, keyPairPayer);
                const transaction2 = await generateTransaction(keyPairPayer.publicKey, keypairUser.publicKey, value, keyPairPayer )
                const transaction3 = await signAndSend(transaction, keypairUser)

                console.log ({ transaction1: transaction1, transaction2: transaction2 , transaction3: transaction3 }) 
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