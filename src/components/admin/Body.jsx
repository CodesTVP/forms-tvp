import { AddRounded } from '@mui/icons-material'
import { Button, Container, Tooltip } from '@mui/material'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { useContext, useEffect } from 'react'
import { FormContext } from '../../contexts/FormContext'
import { FormVisibleContext } from '../../contexts/FormVisibleContext'
import { AllFormsContext } from '../../contexts/ListFormsContext'
import { db } from '../../firebase'

function Body({ children }) {
    const { setForm } = useContext(FormContext)
    const { setFormVisible } = useContext(FormVisibleContext)
    const { setForms } = useContext(AllFormsContext)

    const newForm = () => {
        setForm({
            description: '',
            id: '',
            options: [],
            title: '',
            state: 'new',
        })
        setFormVisible(true)
    }

    useEffect(() => {
        const q = query(collection(db, 'forms'))
        onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map((doc) => doc.data())
            setForms(docs)
            console.log(docs)
        })
    }, [setForms])

    return (
        <Container
            className='m-0 p-0 w-100'
            style={{ maxWidth: '100%' }}
        >
            {children}
            <Tooltip
                title='Criar uma nova enquete'
                placement='left'
            >
                <Button
                    className='position-fixed bottom-0 end-0 rounded-circle m-3'
                    variant='contained'
                    color='white'
                    sx={{ width: '56px', height: '56px', minWidth: '56px' }}
                    onClick={newForm}
                >
                    <AddRounded />
                </Button>
            </Tooltip>
        </Container>
    )
}
export default Body
