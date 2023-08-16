import { createContext, useState } from 'react'

const UserContext = createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState({
        id: null,
        name: 'User',
        email: 'ex@email.com',
        photo: null,
    })

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
