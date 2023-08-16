import { createContext, useState } from 'react'

const AllFormsContext = createContext()

function AllFormsProvider({ children }) {
    const [forms, setForms] = useState([])

    return (
        <AllFormsContext.Provider value={{ forms, setForms }}>
            {children}
        </AllFormsContext.Provider>
    )
}

export { AllFormsContext, AllFormsProvider }
