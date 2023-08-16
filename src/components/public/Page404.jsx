import { Box, Typography } from '@mui/material'

function Page404(props) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                margin: 0,
            }}
        >
            <Typography variant='h1'>404</Typography>
            <Typography variant='subtitle1'>Enquete não encontrada</Typography>
        </Box>
    )
}
export default Page404
