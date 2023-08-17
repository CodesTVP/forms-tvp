import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material'
import {
    arrayUnion,
    collection,
    doc,
    getDocs,
    updateDoc,
} from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import LogoLoading from '../../assets/loading.gif'
import { ActiveFormContext } from '../../contexts/ActiveFormContext'
import { db } from '../../firebase'
import useAuth from '../hooks/useAuth'
import ApexChart from './ApexChart'
import ChartBars from './ChartBars'

function RenderForm(props) {
    const [optionSelected, setOptionSelected] = useState(null)
    const [userHasVoted, setUserHasVoted] = useState(false)
    const [canSend, setCanSend] = useState(false)
    const [isLogged, setIsLogged] = useState(true)
    const { activeForm } = useContext(ActiveFormContext)
    const { user, login, logout, addListener } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const sendResp = () => {
        if (!Boolean(optionSelected)) {
            return 'Nenhuma opção selecionada'
        }
        setCanSend(false)
        setIsLoading(true)
        getDocs(collection(db, `forms/${activeForm.id}/resps`)).then(
            (response) => {
                const resps = response.docs.map((resp) => ({
                    ...resp.data(),
                    id: resp.id,
                }))
                const dataResp = resps.filter(
                    (resp) => resp.value === optionSelected
                )
                if (dataResp.length > 0) {
                    const numVotes = dataResp[0].votes + 1
                    const docRef = doc(
                        db,
                        `forms/${activeForm.id}/resps/${dataResp[0].id}`
                    )
                    updateDoc(docRef, { votes: numVotes }).then(() => {
                        setIsLoading(false)
                    })
                    registerEmail(user.email)
                }
            }
        )
    }

    const registerEmail = (email) => {
        const q = doc(db, `forms/${activeForm.id}/resps/emails`)
        updateDoc(q, {
            emails: arrayUnion(email),
        })
    }

    useEffect(() => {
        addListener()
        const element = document.body
        console.log(element)
        const observer = new ResizeObserver(function (entries) {
            for (let entry of entries) {
                const elementHeight = entry.contentRect.height
                const parentWindow = window.parent
                const message = 'set-iframe-form-height ' + elementHeight
                console.log(message)
                parentWindow.postMessage(message, '*')
            }
        })
        observer.observe(element)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (user.id && activeForm.resps.resps.length > 0) {
            setIsLogged(true)
            const listEmails = activeForm.resps.resps.filter(
                (obj) => obj.id === 'emails'
            )[0].emails
            setUserHasVoted(
                listEmails.includes(user.email) &&
                    user.email !== 'tvpovaoweb@gmail.com'
            )
            console.log('User has voted', userHasVoted)
            if (userHasVoted) setCanSend(false)
            else setCanSend(true)
        } else {
            setIsLogged(false)
            setCanSend(false)
        }
    }, [activeForm.resps.resps, user.email, user.id, userHasVoted])

    return (
        <Container>
            {isLoading && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        margin: 0,
                    }}
                >
                    <img
                        src={LogoLoading}
                        alt='Animação carregando'
                        height={150}
                        width={150}
                    />

                    <Typography variant='subtitle1'>Carregando...</Typography>
                </Box>
            )}
            <Container
                style={{ maxWidth: '500px' }}
                className='p-0'
            >
                <Card
                    elevation={4}
                    className='mb-3 px-2'
                >
                    <CardContent>
                        <Typography
                            variant='h5'
                            className='fw-bold'
                        >
                            {activeForm.title}
                        </Typography>
                        <Box
                            sx={{ gap: '5px' }}
                            className='d-flex align-items-end mt-2'
                        >
                            {user.id ? (
                                <Button
                                    variant='contained'
                                    size='small'
                                    onClick={logout}
                                >
                                    Sair
                                </Button>
                            ) : (
                                <Button
                                    variant='contained'
                                    size='small'
                                    onClick={login}
                                >
                                    Entrar
                                </Button>
                            )}
                            <Typography variant='subtitle1'>
                                {user?.email}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
                <Card
                    elevation={4}
                    className='mb-3 px-2'
                >
                    <CardContent>
                        {!canSend && isLogged && (
                            <Typography
                                variant='h5'
                                className='fw-bold'
                            >
                                Você já votou nessa enquete!
                            </Typography>
                        )}
                        {!isLogged && (
                            <Typography
                                variant='h5'
                                className='fw-bold'
                            >
                                Entre em uma conta para votar.
                            </Typography>
                        )}
                        {canSend && isLogged && (
                            <>
                                <Typography
                                    variant='h6'
                                    className='fw-bold'
                                >
                                    {activeForm.description}
                                </Typography>
                                <FormControl>
                                    <RadioGroup
                                        value={optionSelected}
                                        onChange={(e) =>
                                            setOptionSelected(e.target.value)
                                        }
                                    >
                                        {activeForm.options.map((opt) => (
                                            <>
                                                <FormControlLabel
                                                    sx={{ marginBottom: '8px' }}
                                                    key={
                                                        typeof opt === 'string'
                                                            ? opt
                                                            : opt.value
                                                    }
                                                    value={
                                                        typeof opt === 'string'
                                                            ? opt
                                                            : opt.value
                                                    }
                                                    control={<Radio />}
                                                    label={
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'flex-end',
                                                            }}
                                                        >
                                                            {opt.image && (
                                                                <Avatar
                                                                    src={
                                                                        opt.image
                                                                    }
                                                                    alt='Avatar'
                                                                    sx={{
                                                                        width: 35,
                                                                        height: 35,
                                                                        borderRadius:
                                                                            '5px',
                                                                        marginRight:
                                                                            '8px',
                                                                    }}
                                                                />
                                                            )}
                                                            <Typography variant='body1'>
                                                                {typeof opt ===
                                                                'string'
                                                                    ? opt
                                                                    : opt.value}
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                            </>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Button
                    variant='contained'
                    disabled={!canSend || !optionSelected}
                    onClick={sendResp}
                >
                    Enviar
                </Button>
            </Container>
            {activeForm.resps.labels.length > 0 &&
                activeForm.resps.series.length > 0 && (
                    <Box className='mt-3'>
                        <Typography
                            variant='h6'
                            className='fw-bold'
                        >
                            Veja os gráficos dos votos:
                        </Typography>
                        <ChartBars
                            resps={activeForm.resps.resps}
                            total={activeForm.resps.series.reduce(
                                (acc, value) => acc + value,
                                0
                            )}
                        />
                        <ApexChart
                            labels={activeForm.resps.labels}
                            series={activeForm.resps.series}
                            type='pie'
                        />
                    </Box>
                )}
        </Container>
    )
}

export default RenderForm
