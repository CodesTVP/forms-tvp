import {
    GoogleAuthProvider,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from 'firebase/auth'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

function useAuth() {
    const { user, setUser } = useContext(UserContext)
    const auth = getAuth()
    const provider = new GoogleAuthProvider()

    const login = () => {
        signInWithPopup(auth, provider)
            .then(() => {
                console.log('Logado')
            })
            .catch((err) => console.error(err))
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({
                    id: null,
                    name: 'User',
                    email: 'ex@email.com',
                    photo: null,
                })
            })
            .catch((err) => console.error(err))
    }

    const addListener = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                })
            }
        })
    }

    return {
        user,
        setUser,
        login,
        logout,
        addListener,
    }
}

export default useAuth
