import { TransferRequestURL,  createTransfer,  parseURL } from "@solana/pay";

let str1 = "solana:GvHeR432g7MjN9uKyX3Dzg66TqwrEWgANLnnFZXMeyyj?amount=1&spl-token=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&reference=72FrP58fnrD24Fo48jKR2PoyjjaTcKQJHM9inPV6TFGn&label=Solana%20Pay"

const usdc = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"

export function TestParseURL() {

    try {
        
        const transaction: any = parseURL(str1);
        const parsedTransaction: TransferRequestURL = transaction;
        const amount = parsedTransaction.amount?.toNumber();
        if(!amount || amount <= 0){
            throw new Error("amount not specified")
        }

        if(parsedTransaction.splToken?.toString() !== usdc){
            throw new Error("Only USDC transactions")
        }

    } catch (error) {
        console.log(error)
    }

   
}

