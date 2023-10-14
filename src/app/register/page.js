'use client'

import { useState } from 'react'
import styled from '../../styles/register.module.css'
import { useUserContext } from '../context/userContext'
import { useRouter } from 'next/navigation'



export default function Page(){
    const {name, handleNameChange, cpf, handleCpfChange} = useUserContext()

    const router = useRouter()

    const handleChange = (event)  => {
        handleNameChange(event.target.value);
        console.log(name)
    };
    const handleChangeCpf = (event)  => {
        handleCpfChange(event.target.value);
        console.log(cpf)
    };


    return(<>
        <div className={styled.regis}>
            <h2>Let’s get started</h2>
            <div>
                <input type="text" placeholder="Full Name" onChange={handleChange} value={name}/>
                <input type="text" placeholder="CPF" onChange={handleChangeCpf} value={cpf} />
            </div>
            
            <button onClick={()=> router.push('/scan')}>Let’s go!</button>
            <img src='./imagens/CARRINHO DE COMPRAS.svg' alt='image' />
        </div>
       
    </>)
}