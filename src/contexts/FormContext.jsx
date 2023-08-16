import { createContext, useEffect, useState } from 'react'

const FormContext = createContext()

function FormProvider({ children }) {
    const [form, setForm] = useState({
        description: '',
        id: '',
        options: [],
        title: '',
        state: 'new',
    })

    useEffect(() => {
        console.log(form)
    })

    return (
        <FormContext.Provider value={{ form, setForm }}>
            {children}
        </FormContext.Provider>
    )
}

export { FormContext, FormProvider }
