'use client'

import { useState } from "react";
import { useEffect } from "react";
import QrScanner from "qr-scanner";
import styled from "../../styles/scan.module.css"
import { useUserContext } from "../context/userContext";

export default function Scan(){
    const [qrScanner, setQrScanner] = useState(null)
    const [hidden, setHidden] = useState(styled.show)
    const [trava, setTrava] = useState(false)
    const { link, handleLinkChange} = useUserContext()

    useEffect(() => {
        const theScanner =  new QrScanner(
            document.getElementById('scanner'),
            result => VerifyQrcode(result),
            { highlightScanRegion: true /* your options or returnDetailedScanResult: true if you're not specifying any other options */ },
        );

        setQrScanner(theScanner);
        
    }, [])
    
    function  VerifyQrcode(decodedString) {
      if(trava){
        return
      }
      if(!decodedString.data.includes('solana')){
          console.log("Not a SolanaPay URL")
          return
      }
      setTrava(true)
      const linkDetect = decodedString.data
      console.log(linkDetect)
      handleLinkChange(linkDetect)
      setTrava(false)
      
    }
  
    function startAll() {
      setHidden(styled.hiddenbutton)
      qrScanner.start()
    }

    function stopAll() {
      qrScanner.stop()
    }

  return (
    <>
        <div className={styled.scan}>
            <div className={hidden}>

                <img src="./imagens/CAMERA.svg" alt="cam"/>
            </div>
            
                <video width={100} id='scanner'></video>
                
            
           <div className={hidden}>    
                <button onClick={()=> startAll()}>Start Scan</button>
                
           </div>
        </div>
    </>
  )
}