'use client'

import Link from 'next/link'
import styled from '../styles/index.module.css'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()
    

    return(
      <>
        <div className={styled.index}>
          <h2>SOL PIX</h2>
          <h3>Crypto comes to real Brazil</h3>
          <button onClick={()=> router.push('/register')}>Start</button>
          <div className={styled.how}>
            <img src='./imagens/INTERROGAÇÃO.svg' alt="how" />
          </div>
        </div>
          
      </>
    )
}
