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
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import LogoLoading from '../../assets/loading.gif'
import { ActiveFormContext } from '../../contexts/ActiveFormContext'
import { db } from '../../firebase'
import ApexChart from './ApexChart'
import ChartBars from './ChartBars'

function RenderForm() {
    const [optionSelected, setOptionSelected] = useState(null)
    const [userHasVoted, setUserHasVoted] = useState(false)
    const [canSend, setCanSend] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { activeForm } = useContext(ActiveFormContext)

    const voteKey = `voted_form_${activeForm.id}`

    const sendResp = () => {
        if (!optionSelected) return 'Nenhuma opção selecionada'
        setCanSend(false)
        setIsLoading(true)

        getDocs(collection(db, `forms/${activeForm.id}/resps`)).then(
            (response) => {
                const resps = response.docs.map((resp) => ({
                    ...resp.data(),
                    id: resp.id,
                }))

                const dataResp = resps.find(
                    (resp) => resp.value === optionSelected
                )

                if (dataResp) {
                    const numVotes = dataResp.votes + 1
                    const docRef = doc(
                        db,
                        `forms/${activeForm.id}/resps/${dataResp.id}`
                    )

                    updateDoc(docRef, { votes: numVotes }).then(() => {
                        localStorage.setItem(voteKey, 'true')
                        setUserHasVoted(true)
                        setIsLoading(false)
                    })
                }
            }
        )
    }

    useEffect(() => {
        const hasVoted = localStorage.getItem(voteKey) === 'true'
        setUserHasVoted(hasVoted)
        setCanSend(!hasVoted)
    }, [activeForm.id, voteKey])

    useEffect(() => {
        const element = document.body
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const elementHeight = entry.contentRect.height
                window.parent.postMessage(
                    'set-iframe-form-height ' + elementHeight,
                    '*'
                )
            }
        })
        observer.observe(element)
    }, [])

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
                        backgroundColor: 'white',
                        zIndex: '999',
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
                {!activeForm.disabled ? (
                    <>
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
                            </CardContent>
                        </Card>

                        <Card
                            elevation={4}
                            className='mb-3 px-2'
                        >
                            <CardContent>
                                {userHasVoted ? (
                                    <Typography
                                        variant='h5'
                                        className='fw-bold'
                                    >
                                        Você já votou nessa enquete!
                                    </Typography>
                                ) : (
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
                                                    setOptionSelected(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {activeForm.options.map(
                                                    (opt) => (
                                                        <FormControlLabel
                                                            key={
                                                                typeof opt ===
                                                                'string'
                                                                    ? opt
                                                                    : opt.value
                                                            }
                                                            value={
                                                                typeof opt ===
                                                                'string'
                                                                    ? opt
                                                                    : opt.value
                                                            }
                                                            control={<Radio />}
                                                            label={
                                                                <Box
                                                                    sx={{
                                                                        display:
                                                                            'flex',
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
                                                    )
                                                )}
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
                    </>
                ) : (
                    <Card
                        elevation={4}
                        className='mb-3 px-2'
                    >
                        <CardContent>
                            <Typography
                                variant='h5'
                                className='fw-bold'
                            >
                                A votação foi encerrada!
                            </Typography>
                        </CardContent>
                    </Card>
                )}
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
