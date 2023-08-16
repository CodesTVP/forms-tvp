import { ActiveFormProvider } from './ActiveFormContext'
import CustomPublicTheme from './FormThemeContext'
import { LoadingProvider } from './LoadingContext'
import { UserProvider } from './UserContext'

function PublicContexts({ children }) {
    return (
        <UserProvider>
            <CustomPublicTheme>
                <LoadingProvider>
                    <ActiveFormProvider>{children}</ActiveFormProvider>
                </LoadingProvider>
            </CustomPublicTheme>
        </UserProvider>
    )
}
export default PublicContexts
