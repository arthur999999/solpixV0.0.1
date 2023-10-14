'use client'

import { createQR, encodeURL } from "@solana/pay";
import { PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { useEffect } from "react";

export default function generateQrcode(){
    useEffect(()=> {
        const recipient = new PublicKey('3jxbH9adwU9r36gx7VN6riQU2FaUAtqGKcDw8QEBqmL2');
        const amount = new BigNumber(0.01);
        const splToken = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
        const url = encodeURL({
            recipient,
            amount,
            splToken
        })

        const qrcode = createQR(url, 300)
        qrcode.append(document.getElementById("canvas"))
    }, [])

    
    
    return(<>
        
            <div id="canvas"/>
        
    </>)
}