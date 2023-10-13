'use client'

import { useState } from 'react'
import styled from '../../styles/register.module.css'



export default function Page(){
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")

    const handleChange = (event)  => {
        setName(event.target.value);
    };
    const handleChangeCpf = (event)  => {
        setCpf(event.target.value);
    };


    return(<>
        <div className={styled.regis}>
            <h2>Let's get started</h2>
            <div>
                <input type="text" placeholder="Full Name" onChange={handleChange} value={name}/>
                <input type="text" placeholder="CPF" onChange={handleChangeCpf} value={cpf} />
            </div>
            
            <button>Let's go!</button>
            <img src='./imagens/CARRINHO DE COMPRAS.svg' alt='image' />
        </div>
       
    </>)
}