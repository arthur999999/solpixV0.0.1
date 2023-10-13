import { TransferRequestURL,  createTransfer,  parseURL } from "@solana/pay";



const usdc = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"

export function PostParseURL(url: string) {

  
        
        const transaction: any = parseURL(url);
        const parsedTransaction: TransferRequestURL = transaction;
        const amount = parsedTransaction.amount?.toNumber();
        if(!amount || amount <= 0){
            throw new Error("amount not specified")
        }

        if(parsedTransaction.splToken?.toString() !== usdc){
            throw new Error("Only USDC transactions")
        }


        return parsedTransaction;

   
      
   
   
}

