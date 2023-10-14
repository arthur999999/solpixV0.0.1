'use client'

import { useEffect, useState } from "react"
import { postLink } from "../api/postLink"
import { useUserContext } from "../context/userContext"
import styled from "../../styles/pix.module.css"
import { postTxid } from "../api/posttxid"
import { useRouter } from "next/navigation"

export default function PixPage(){
    const router = useRouter()
    const [data, setData] = useState(false)
    const [txid, setTxid] = useState("")
    const {name, cpf, link} = useUserContext()
    useEffect( ()=> {
        postLink(name, cpf, link).then((res)=> {
           
           console.log(res.data)
           setData(res.data)
           setTxid(res.data.responsePix.txid)
           
        }).catch((e)=> {
            console.log(e)
        })
        
    }, [])

    useEffect(()=>{
        if(!data){
            return;
        }

        let timeout;

        const checkApi = async () => {
                try {
                    const checkPayment = await postTxid(txid);
                    console.log(checkPayment)
                if (checkPayment.data.status !== "CONCLUIDA") {
                    timeout = setTimeout(checkApi, 5000);
                }else{
                    router.push('/confirmed')
                }
            } catch (error) {
                console.log(error)
                timeout = setTimeout(checkApi, 5000);
            }
            
        }

        
        timeout = setTimeout(checkApi, 5000);

       
        return () => {
            clearTimeout(timeout);
        }
    }, [data])



        async function copyContent () {
            try {
            await navigator.clipboard.writeText(data.link);
            console.log('Content copied to clipboard');
            } catch (err) {
            console.error('Failed to copy: ', err);
            }
        }

    if(data){
        return(
            <>
                <div className={styled.pix}>
                    <img src="./imagens/PIX.svg" alt="pix" /><div>
                        <h2>
                            Make a Pix transfer worth R${data.responsePix.valor.original}
                        </h2>
                        <button onClick={()=> copyContent()}>Copy Key</button>
                    </div>
                </div>
            </>
        )
    }
    return( <div className={styled.pix}>
                 <h1>Loading...</h1>
            </div>
            )

    
}