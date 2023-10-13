import styled from '../styles/index.module.css'

export default function Home() {
  
    return(
      <>
        <div className={styled.index}>
          <h2>SOL PIX</h2>
          <h3>Crypto comes to real Brazil</h3>
          <button>Start</button>
          <div className={styled.how}>
            <img src='./imagens/INTERROGAÇÃO.svg' alt="how" />
          </div>
        </div>
          
      </>
    )
}
