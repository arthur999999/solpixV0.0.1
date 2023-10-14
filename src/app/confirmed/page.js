import styled from "../../styles/confirmed.module.css"

export default function FinishPage(){
    return(<>
        <div className={styled.confi}>
            <img src="./imagens/EMOJI.svg" alt="emoji" />
            <h2>Purchase made</h2>
            <h3>successfully!</h3>
            <p>Thank you for using Sol Pix!</p>
        </div>
    </>)
}