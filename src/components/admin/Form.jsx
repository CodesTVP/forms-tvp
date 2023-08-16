import {
    Add,
    AddRounded,
    ArrowDropDownRounded,
    ArrowDropUpRounded,
    DeleteRounded,
    PublishRounded,
} from '@mui/icons-material'
import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import {
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
} from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { FormContext } from '../../contexts/FormContext'
import { FormVisibleContext } from '../../contexts/FormVisibleContext'
import { db } from '../../firebase'

function FormEdite(props) {
    const { setFormVisible } = useContext(FormVisibleContext)
    const { form, setForm } = useContext(FormContext)
    const [formTitle, setFormTitle] = useState(form.title)
    const [formDescription, setFormDescription] = useState(form.description)
    const [newOption, setNewOption] = useState('')
    const [formRef, setFormRef] = useState()

    const addOption = () => {
        updateDoc(formRef, {
            options: arrayUnion(newOption),
        }).then(() => {
            const docRef = doc(
                db,
                `forms/${form.id}/resps`,
                transformString(newOption)
            )
            setDoc(docRef, { value: newOption, votes: 0 }).then(() => {
                setNewOption('')
            })
        })
    }

    const removeOption = (value) => {
        updateDoc(formRef, {
            options: arrayRemove(value),
        })
    }

    const changePosition = (from, to) => {
        const options = form.options
        const newOptions = changeIndex(options, from, to)
        updateDoc(formRef, {
            options: newOptions,
        })
    }

    const changeIndex = (arr, from, to) => {
        arr.splice(to, 0, arr.splice(from, 1)[0])
        return arr
    }

    const saveAndClose = () => {
        if (formTitle && formDescription && form.state === 'new') {
            console.log('Criar form')
            const id = transformString(formTitle) + new Date().getTime()
            setDoc(doc(db, 'forms', id), {
                id,
                title: formTitle,
                description: formDescription,
                options: [],
            }).then(() => {
                getDoc(doc(db, 'forms', id)).then((doc) => {
                    console.log(doc)
                    const docData = doc.data()
                    console.log(docData)
                    setForm({
                        id: doc.id,
                        title: docData.title,
                        description: docData.description,
                        options: docData.options,
                        state: 'edite',
                    })
                })
                const docRef = doc(db, `forms/${id}/resps`, 'emails')
                setDoc(docRef, { emails: newOption, id: 'emails' })
            })
        } else if (formTitle && formDescription) {
            console.log('Editar form')
            updateDoc(formRef, {
                title: formTitle,
                description: formDescription,
            }).then(() => setFormVisible(false))
        }
    }

    const transformString = (text) => {
        text = text.toLowerCase()
        text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        text = text.replace(/\s+/g, '')
        return text
    }

    useEffect(() => {
        console.log('Mudou')
        if (form.id) {
            setFormRef(doc(db, 'forms', form.id))
            const q = query(doc(db, 'forms', form.id))
            onSnapshot(q, (snapshot) => {
                const formDoc = snapshot.data()
                setForm({ state: form.state, ...formDoc })
            })
        }
    }, [form.id, form.state, setForm])

    return (
        <Paper
            elevation={3}
            sx={{ maxWidth: 700 }}
            className='py-3 px-4 w-100 mb-3'
        >
            <Typography
                variant='h6'
                component='div'
                className='mb-3 d-flex justify-content-center'
            >
                Editar as Opções
            </Typography>
            <TextField
                variant='outlined'
                fullWidth
                size='small'
                label='Nome da enquete'
                className='mb-3'
                value={form.title}
                onChange={(e) => {
                    setForm({ ...form, title: e.target.value })
                    setFormTitle(e.target.value)
                }}
            />
            <TextField
                variant='outlined'
                fullWidth
                size='small'
                label='Pergunta da enquete'
                className='mb-3'
                value={form.description}
                onChange={(e) => {
                    setForm({ ...form, description: e.target.value })
                    setFormDescription(e.target.value)
                }}
            />
            {form.state === 'edite' && (
                <>
                    <List className='border rounded mb-3 p-0'>
                        {form.options.map((opt, index) => (
                            <div key={opt}>
                                <ListItem
                                    secondaryAction={
                                        <ButtonGroup
                                            variant='contained'
                                            color='white'
                                        >
                                            <Tooltip title='Mover para cima'>
                                                <Button
                                                    color='white'
                                                    onClick={() =>
                                                        changePosition(
                                                            index,
                                                            index - 1
                                                        )
                                                    }
                                                >
                                                    <ArrowDropUpRounded />
                                                </Button>
                                            </Tooltip>
                                            <Divider
                                                orientation='vertical'
                                                flexItem
                                            />
                                            <Tooltip title='Mover para baixo'>
                                                <Button
                                                    color='white'
                                                    onClick={() =>
                                                        changePosition(
                                                            index,
                                                            index + 1
                                                        )
                                                    }
                                                >
                                                    <ArrowDropDownRounded />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title='Excluir opção'>
                                                <Button
                                                    color='error'
                                                    onClick={() =>
                                                        removeOption(opt)
                                                    }
                                                >
                                                    <DeleteRounded />
                                                </Button>
                                            </Tooltip>
                                        </ButtonGroup>
                                    }
                                >
                                    <ListItemText primary={opt} />
                                </ListItem>
                                {index < form.options.length - 1 ? (
                                    <Divider />
                                ) : null}
                            </div>
                        ))}
                    </List>
                    <Box
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <TextField
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '4px 0px 0px 4px',
                                },
                            }}
                            fullWidth
                            variant='outlined'
                            label='Adicionar opção:'
                            size='small'
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                        />
                        <IconButton
                            onClick={addOption}
                            sx={{
                                borderRadius: '0px 4px 4px 0px',
                                borderWidth: '1px 1px 1px 0px',
                                borderStyle: 'solid',
                                borderColor: '#c4c4c4',
                                '&:hover': {
                                    borderWidth: '1px',
                                    borderColor: '#000000',
                                },
                                '&:active': {
                                    borderWidth: '2px',
                                    borderColor: '#1976d2',
                                },
                            }}
                        >
                            <Add />
                        </IconButton>
                    </Box>
                </>
            )}
            <Button
                className='w-100 mt-3'
                startIcon={
                    form.state === 'edite' ? <PublishRounded /> : <AddRounded />
                }
                variant='contained'
                color='white'
                onClick={saveAndClose}
            >
                {form.state === 'edite'
                    ? 'Salvar e recolher'
                    : 'Criar formulário e adicionar opções'}
            </Button>
        </Paper>
    )
}
export default FormEdite
