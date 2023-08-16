import { createContext, useState } from 'react'

const ActiveFormContext = createContext()

function ActiveFormProvider({ children }) {
    const [activeForm, setActiveForm] = useState({
        id: '',
        title: 'ENQUETE DE TESTE DA TV POVÃO (REACT)',
        description:
            'Se você fosse blá blá blá, qual opção abaixo você escolheria?',
        options: ['Teste 1', 'Teste 2', 'Teste 3', 'Teste 4', 'Teste 5'],
        resps: {
            resps: [],
            labels: [],
            series: [],
        },
    })

    return (
        <ActiveFormContext.Provider value={{ activeForm, setActiveForm }}>
            {children}
        </ActiveFormContext.Provider>
    )
}

export { ActiveFormContext, ActiveFormProvider }
