import { createContext, useCallback, useContext, useState } from "react"

const userContext = createContext()

export const UserProvider = ({children}) => {

    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [link, setLink] = useState("")
    const [txid, setTxid] = useState("")

    const handleNameChange = useCallback((name) => {
        setName(name)
    }, [])

    const handleCpfChange = useCallback((cpf) => {
        setCpf(cpf)
    }, [])

    const handleLinkChange = useCallback((name) => {
        setLink(name)
    }, [])
    
    const handleTxidChange = useCallback((name)=> {
        setTxid(name)
    }, [])

    return (
        <userContext.Provider value={{ name, handleNameChange, cpf, handleCpfChange, link, handleLinkChange, txid, setTxid }}>
            {children}
        </userContext.Provider>
    )
}

export const useUserContext = () => useContext(userContext)