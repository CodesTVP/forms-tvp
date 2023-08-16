import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: '18px',
                },
            },
        },
    },
    palette: {
        white: {
            light: '#121212',
            main: '#ffffff',
            dark: '#e9e9e9',
            contrastText: '#000000',
        },
    },
})

function CustomTheme({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
export default CustomTheme
