import { TransferRequestURL, createTransfer } from "@solana/pay";
import { approve, createTransferCheckedInstruction, decodeInstruction, getAccount, getAssociatedTokenAddress, getMint, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SignaturePubkeyPair, Signer, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmRawTransaction, sendAndConfirmTransaction } from "@solana/web3.js";
import BigNumber from "bignumber.js";

let connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

export async function signAndSend(transactionSend: Transaction, keypairGenerated: Keypair){

    try {
    


        transactionSend.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

        

        const tx = transactionSend.serialize()


        const signature = await connection.sendRawTransaction(tx, {
            maxRetries: 5
        })



        return signature;

    } catch (error) {
            console.log(error)
    }


}

export async function generateTransaction(sender: PublicKey, recive: PublicKey, value: number, signer: Keypair) {

    try {
        
    const splToken = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')

    const senderInfo = await connection.getAccountInfo(sender);
    if (!senderInfo) throw new Error('sender not found');

    const senderAccount = await getOrCreateAssociatedTokenAccount(connection, signer, splToken, sender);

    if (!senderAccount.isInitialized) throw new Error('sender not initialized');
    if (senderAccount.isFrozen) throw new Error('sender frozen');


    const merchantAccount = await getOrCreateAssociatedTokenAccount(connection,signer , splToken, recive)
    
    if (!merchantAccount.isInitialized) throw new Error('merchant not initialized');
    if (merchantAccount.isFrozen) throw new Error('merchant frozen');

    
    const mint = await getMint(connection, splToken);
  
    let amount = BigNumber(value);
    let TEN = BigNumber(10)
    amount = amount.times(TEN.pow(mint.decimals)).integerValue(BigNumber.ROUND_FLOOR);

    const tokens = BigInt(String(amount));
    if (tokens > senderAccount.amount) throw new Error('insufficient funds');

    const splTransferIx = createTransferCheckedInstruction(
        senderAccount.address,
        splToken,
        merchantAccount.address,
        sender,
        tokens,
        mint.decimals
    );

    const transaction = new Transaction().add(splTransferIx)
    const lastBlock = await connection.getLatestBlockhash('confirmed')
    transaction.recentBlockhash = lastBlock.blockhash;

    const signarute = await sendAndConfirmTransaction(connection, transaction, [signer])

    return signarute;

    } catch (error) {
        console.log(error) 
    }
}

export async function generateSoltransaction( recive: PublicKey, value: number, signer: Keypair){

    try {
        let transaction = new Transaction();

        transaction.add(
        SystemProgram.transfer({
            fromPubkey: signer.publicKey,
            toPubkey: recive,
            lamports: LAMPORTS_PER_SOL * value,
        }),
        );



        const signarute = await sendAndConfirmTransaction(connection, transaction, [signer]);
    
        return signarute;
    } catch (error) {
        console.log(error)
    }
}

export default async function createURLtx(payer: Keypair, url: TransferRequestURL ) {
    try {
        
        const { recipient, amount, splToken, reference, memo } = url
        if(!amount ) {
            throw new Error('only 0.01 amount')
            
        }
        if(splToken?.toString() !== "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"){
            throw new Error("only USDC")
        }

        const senderInfo = await connection.getAccountInfo(payer.publicKey);
        if (!senderInfo) throw new Error('sender not found');


        const tx = await createTransfer(connection, payer.publicKey, { recipient, amount, splToken, reference, memo })

        const signature = await sendAndConfirmTransaction(connection, tx, [payer])

        

        return signature;

    } catch (error) {
        console.log(error)
    }

    
}