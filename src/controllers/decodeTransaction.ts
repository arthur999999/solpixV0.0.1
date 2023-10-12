import { decodeInstruction, decodeTransferInstruction } from "@solana/spl-token";
import { Connection, PublicKey, SystemInstruction, Transaction, TransactionInstruction, clusterApiUrl,  } from "@solana/web3.js";



export  async function ShowTransaction(transactionUrl: string) {


   const str = transactionUrl


   const usdc = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
   const memo = "Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo"
   const tkpg = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
   const atap = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"

   const programsIds = [memo, tkpg, atap]

   try {
      
      const serealizeTransaction = Buffer.from(str, 'base64')

      const trasnsac = Transaction.from(serealizeTransaction)

      if(trasnsac.instructions.length !== 3){
         throw new Error("invalid instructions");
      }

      let decodeInstru: any;

      trasnsac.instructions.forEach((instruction , i) => {

         if(!programsIds.includes(instruction.programId.toString())){
            throw new Error("invalid instructions")
         }

         if(instruction.programId.toString() == tkpg){
            decodeInstru = decodeInstruction(trasnsac.instructions[i]);
         }

      })      

      let trasactionDetails = {
         mint: (new PublicKey(decodeInstru.keys?.mint.pubkey)).toString(),
         destination: (new PublicKey(decodeInstru.keys?.destination.pubkey)).toString(),
         owner: (new PublicKey(decodeInstru.keys?.owner.pubkey)).toString(),
         amount: decodeInstru.data.amount,
         decimals: decodeInstru.data.decimals
      }

      const valueDecoded = Number(trasactionDetails.amount)/ (10**trasactionDetails.decimals);

      if(trasactionDetails.mint !== usdc) {
         throw new Error("only USDC trasactions")
      }

      return { trasactionDetails, valueDecoded, trasnsac };

   } catch (error) {
      throw error
   }

  

   

   

   
}


