import { decodeInstruction, decodeTransferInstruction } from "@solana/spl-token";
import { Connection, PublicKey, SystemInstruction, Transaction, TransactionInstruction, clusterApiUrl,  } from "@solana/web3.js";

let connection = new Connection(clusterApiUrl("mainnet-beta"))

export default async function ShowTransaction() {

   const str = "AvCgG/2z3KJNoPQXXVDeqRGQx78ASSvtqemPYdwMg7amAhtA6HlVMFIJVuR3nyMNZZrKVSl8nU9dZlPK6SDw/w0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgEIDZJhP8zBLFFanmIsJfwolrUKml51tZm/LKSHILBd9LrE8iK7ab8BqBoanChx19/sFV56tue0HJJxzFB1wn/X5cssq03amnvQZLcqPcGzWf3mHRRJwwc/cX6ppF8yrjkII2+6lpMByQTiOdWXysQ7XQKBcApKk8oQnLhHjmXrYEkG8Rr71hpUBQ5opVo2rHb/kbcWSTgeU+uApSKGSzaqSCkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8JlzsXBjfwOOmMAywrCrl8EP5NuZ46yhBlUevTSnxZjJclj04kifG7PRApFI4NgwtaE5na/xCEBI572Nvp+FmVuF1JNxH7D3LkMYcMQVvSwbghOVJzEii4mm+nFtg7mcb6evO+2606PWXzaqvJdDGxu+TC0vbg5HymAgNFL11h07I6NPFn8iyspwZC+HNJ2wmFKpE/P8JQUUzkeZjhMvMFSlNQ+F3IgtYUpVZyeIopbd8eq6vQpgZ4iEky9O72oAbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpEZJkefxfEBDuFQQo1htpa3Qv1KIqGJTYVTAC9hJqSl0DBwYABAgJBQwADAQDCQIBCgwQJwAAAAAAAAYLAwAKBg9zb2xhbmEgcGF5IG1lbW8="


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

      console.log(Number(trasactionDetails.amount)/ (10**trasactionDetails.decimals))

      if(trasactionDetails.mint !== usdc) {
         throw new Error("only USDC trasactions")
      }

      console.log(trasactionDetails)

   } catch (error) {
      console.log(error)
   }

  

   

   

   
}


