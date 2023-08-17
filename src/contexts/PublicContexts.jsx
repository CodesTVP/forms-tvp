import { ActiveFormProvider } from './ActiveFormContext'
import CustomPublicTheme from './FormThemeContext'
import { UserProvider } from './UserContext'

function PublicContexts({ children }) {
    return (
        <UserProvider>
            <CustomPublicTheme>
                <ActiveFormProvider>{children}</ActiveFormProvider>
            </CustomPublicTheme>
        </UserProvider>
    )
}
export default PublicContexts
