import { FormProvider } from './FormContext'
import { FormVisibleProvider } from './FormVisibleContext'
import { AllFormsProvider } from './ListFormsContext'
import CustomTheme from './ThemeContext'
import { UserProvider } from './UserContext'

function AdminContexts({ children }) {
    return (
        <AllFormsProvider>
            <CustomTheme>
                <UserProvider>
                    <FormVisibleProvider>
                        <FormProvider>{children}</FormProvider>
                    </FormVisibleProvider>
                </UserProvider>
            </CustomTheme>
        </AllFormsProvider>
    )
}
export default AdminContexts
