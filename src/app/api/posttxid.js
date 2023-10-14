import axios from "axios";


export async function postTxid(txid){
    const response = await axios.post('/verifyPayment', {
        txid: txid
    })

    return response
}