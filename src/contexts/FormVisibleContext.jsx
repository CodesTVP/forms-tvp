import { createContext, useState } from 'react'

const FormVisibleContext = createContext()

function FormVisibleProvider({ children }) {
    const [formVisible, setFormVisible] = useState(false)

    return (
        <FormVisibleContext.Provider value={{ formVisible, setFormVisible }}>
            {children}
        </FormVisibleContext.Provider>
    )
}

export { FormVisibleContext, FormVisibleProvider }
