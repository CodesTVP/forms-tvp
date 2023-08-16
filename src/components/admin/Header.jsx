import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import Logo from '../../assets/logo.png'
import AccountMenu from './Menu'

function Header(props) {
    return (
        <header>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position='static'
                    color='white'
                >
                    <Toolbar>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexGrow: 1,
                            }}
                        >
                            <img
                                src={Logo}
                                alt='Logo enquetes da TV Povão'
                                style={{ width: 25, height: 25 }}
                                className='me-2'
                            />
                            <Typography
                                variant='h6'
                                component='div'
                            >
                                Enquetes da TV Povão
                            </Typography>
                        </Box>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    )
}
export default Header
