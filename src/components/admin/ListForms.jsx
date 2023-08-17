import {
    ContentCopyRounded,
    DeleteRounded,
    EditRounded,
} from '@mui/icons-material'
import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Divider,
    List,
    ListItem,
    Tooltip,
    Typography,
} from '@mui/material'
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore'
import { useContext } from 'react'
import { FormContext } from '../../contexts/FormContext'
import { FormVisibleContext } from '../../contexts/FormVisibleContext'
import { AllFormsContext } from '../../contexts/ListFormsContext'
import { db } from '../../firebase'

function ListForms(props) {
    const { setFormVisible } = useContext(FormVisibleContext)
    const { setForm } = useContext(FormContext)
    const { forms } = useContext(AllFormsContext)

    const embed = (form) => {
        const formId = form.id
        const stringIframe = `<iframe width="100%" height="550px" frameborder="none" src="${
            'https://codestvp.github.io/forms-tvp/#/form/' + formId
        }" id="${formId}"></iframe>`
        const stringScript = `<script>function receive(event){const brokenData=event.data?.toString()?.split(' ');if(brokenData.length===2){const [action,value]=[brokenData[0],brokenData[1]];if(action==='set-iframe-form-height'){document.getElementById('${formId}').height=(parseInt(value)+60)+'px';}}};window.addEventListener("message",receive);</script>`
        const code = stringIframe + stringScript
        navigator.clipboard.writeText(code)
    }

    const deleteForm = async (form) => {
        const q = query(collection(db, `forms/${form.id}/resps`))
        const querySnapshot = await getDocs(q)
        const deleteOps = []
        querySnapshot.forEach((doc) => {
            deleteOps.push(deleteDoc(doc.ref))
        })
        await Promise.all(deleteOps)
        deleteDoc(doc(db, 'forms', form.id))
    }

    return (
        <>
            <List
                className='w-100'
                sx={{ maxWidth: 700 }}
            >
                {forms.map((form) => (
                    <ListItem
                        className='p-0 mb-3'
                        key={form.id}
                    >
                        <Card
                            sx={{ width: '100%' }}
                            elevation={3}
                        >
                            <CardContent>
                                <Typography variant='h6'>
                                    {form.title}
                                </Typography>
                                <Card
                                    className='my-2'
                                    elevation={3}
                                >
                                    <CardContent>
                                        <Typography variant='subtitle1'>
                                            <span className='fw-bold'>
                                                Pergunta:
                                            </span>{' '}
                                            {form.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card
                                    className='my-2'
                                    elevation={3}
                                >
                                    <CardContent>
                                        <Typography
                                            variant='body1'
                                            className='fw-bold'
                                        >
                                            Opções:
                                        </Typography>
                                        {typeof form.options[0] === 'string'
                                            ? form.options.join(', ')
                                            : form.options
                                                  .map((opt) => opt.value)
                                                  .join(', ')}
                                    </CardContent>
                                </Card>
                                <ButtonGroup
                                    color='white'
                                    variant='contained'
                                >
                                    <Tooltip title='Editar Enquete'>
                                        <Button
                                            onClick={() => {
                                                setForm({
                                                    ...form,
                                                    state: 'edite',
                                                })
                                                setFormVisible(true)
                                            }}
                                        >
                                            <EditRounded />
                                        </Button>
                                    </Tooltip>
                                    <Divider
                                        orientation='vertical'
                                        flexItem
                                    />
                                    <Tooltip title='Copiar código'>
                                        <Button onClick={() => embed(form)}>
                                            <ContentCopyRounded />
                                        </Button>
                                    </Tooltip>
                                    <Divider
                                        orientation='vertical'
                                        flexItem
                                    />
                                    <Tooltip title='Excluir enquete'>
                                        <Button
                                            color='error'
                                            onClick={() => deleteForm(form)}
                                        >
                                            <DeleteRounded />
                                        </Button>
                                    </Tooltip>
                                </ButtonGroup>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </>
    )
}
export default ListForms
