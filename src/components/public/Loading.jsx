import { Box, Typography } from '@mui/material'
import LogoLoading from '../../assets/loading.gif'

function Loading(props) {
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
            <img
                src={LogoLoading}
                alt='Animação carregando'
                height={150}
                width={150}
            />
            {props.status && (
                <Typography variant='subtitle1'>{props.status}</Typography>
            )}
        </Box>
    )
}

export default Loading
