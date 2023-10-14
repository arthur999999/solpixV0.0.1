'use client'

import { UserProvider } from "../context/userContext"

export const Providers = ({children}) => {
    return <UserProvider>{children}</UserProvider>
}