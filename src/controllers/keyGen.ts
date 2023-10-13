import { Keypair } from "@solana/web3.js"




export function generateDefaultKey(){

    let str: any = process.env.SEED_STRING;
    const array = str?.split(",")
    const arrayNumber = []
    for (let elemenet of array) {
        arrayNumber.push(Number(elemenet))
    }

   const keypairDefault = Keypair.fromSecretKey(new Uint8Array(arrayNumber))
   return keypairDefault;
    

}


