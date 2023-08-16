import { HashRouter, Route, Routes } from 'react-router-dom'
import RenderForm from './components/public/RenderForm'
import AdminContexts from './contexts/AdminContexts'
import PublicContexts from './contexts/PublicContexts'
import Admin from './pages/Admin'
import Public from './pages/Public'

function Router(props) {
    return (
        <HashRouter>
            <Routes>
                <Route
                    path='/'
                    element={
                        <AdminContexts>
                            <Admin />
                        </AdminContexts>
                    }
                />
                <Route
                    path='/form'
                    element={
                        <PublicContexts>
                            <Public />
                        </PublicContexts>
                    }
                >
                    <Route
                        path=':id'
                        element={<RenderForm />}
                    />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default Router
