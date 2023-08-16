import { createContext, useState } from 'react'

const LoadingContext = createContext()

function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export { LoadingContext, LoadingProvider }
