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
        MuiCard: {
            styleOverrides: {
                root: {
                    borderTop: '5px solid #0033da',
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#0033da',
        },
    },
})

function CustomPublicTheme({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
export default CustomPublicTheme
