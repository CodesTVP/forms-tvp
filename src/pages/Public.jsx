import { Box, Typography } from '@mui/material'
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router'
import Loading from '../components/public/Loading'
import Page404 from '../components/public/Page404'
import { ActiveFormContext } from '../contexts/ActiveFormContext'
import { db } from '../firebase'

function Public() {
    const [isLoading, setIsLoading] = useState(true)
    const [formExists, setFormExists] = useState(true)
    const { setActiveForm } = useContext(ActiveFormContext)
    const { id } = useParams()

    useEffect(() => {
        const docQuery = query(doc(db, 'forms', id))
        getDoc(docQuery).then((doc) => {
            if (doc.exists()) {
                setFormExists(true)
                const docData = doc.data()
                const collectionQuery = query(
                    collection(db, `forms/${id}/resps`)
                )
                setActiveForm((pastData) => ({ ...pastData, ...docData }))
                onSnapshot(collectionQuery, (snapshot) => {
                    const responseDocuments = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))

                    const emailResponses = responseDocuments.filter(
                        (data) => data.id === 'emails'
                    )[0]

                    const sortedResponses = responseDocuments
                        .filter((data) => data.votes)
                        .sort((a, b) => b.votes - a.votes)

                    let orderedResponsesArray = [emailResponses]

                    sortedResponses.forEach((response) =>
                        orderedResponsesArray.push(response)
                    )

                    setIsLoading(false)

                    const extractKeyValues = (dataArray, key) => {
                        return dataArray
                            .filter((data) => data[key])
                            .map((data) => data[key])
                    }

                    const labelValues = extractKeyValues(
                        orderedResponsesArray,
                        'value'
                    )
                    const voteSeries = extractKeyValues(
                        orderedResponsesArray,
                        'votes'
                    )

                    const responsesObject = {
                        resps: orderedResponsesArray,
                        labels: labelValues,
                        series: voteSeries,
                    }

                    setActiveForm((previousData) => ({
                        ...previousData,
                        resps: responsesObject,
                    }))
                })
            } else {
                setIsLoading(false)
                setFormExists(false)
            }
        })
    }, [id, setActiveForm, setIsLoading])

    return (
        <Box className={!isLoading && formExists ? 'm-3' : 'm-0'}>
            {!isLoading && formExists && (
                <Typography
                    variant='h6'
                    className='fw-bold mb-3'
                >
                    Vote no formulário:
                </Typography>
            )}
            {isLoading && <Loading />}
            {!formExists && <Page404 />}
            {!isLoading && formExists && <Outlet />}
        </Box>
    )
}

export default Public
