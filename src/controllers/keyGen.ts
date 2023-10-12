import { Keypair } from "@solana/web3.js"

export function generateKeys(){
   
    const keysPair = Keypair.generate()

    console.log( keysPair.secretKey.toString())
    

}

