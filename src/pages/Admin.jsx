import React, { useContext } from 'react'
import Body from '../components/admin/Body'
import Form from '../components/admin/Form'
import Header from '../components/admin/Header'
import ListForms from '../components/admin/ListForms'
import Main from '../components/admin/Main'
import { FormVisibleContext } from '../contexts/FormVisibleContext'

function Admin(props) {
    const { formVisible } = useContext(FormVisibleContext)
    return (
        <Body>
            <Header />
            <Main>
                {formVisible && <Form />}
                <ListForms />
            </Main>
        </Body>
    )
}
export default Admin
