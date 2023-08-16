import { Logout, PersonAdd } from '@mui/icons-material'
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

function AccountMenu() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const { user, login, logout, addListener } = useAuth()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        addListener()
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <Box>
                <Tooltip title='Configurações da conta'>
                    <IconButton
                        onClick={handleClick}
                        size='small'
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            sx={{ width: 32, height: 32 }}
                            src={user.photo ? user.photo : ''}
                            alt={user.name}
                        ></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: -0.5,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            style={{ width: '45px', height: '45px' }}
                            src={user.photo ? user.photo : ''}
                            alt={user.name}
                        ></Avatar>
                        <Box>
                            <Typography
                                variant='h6'
                                className='m-0'
                            >
                                {user.name}
                            </Typography>
                            <Typography
                                variant='subtitle2'
                                className='m-0'
                            >
                                {user.email}
                            </Typography>
                        </Box>
                    </Box>
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        login()
                        handleClose()
                    }}
                >
                    <ListItemIcon>
                        <PersonAdd fontSize='small' />
                    </ListItemIcon>
                    Login / Mudar de conta
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        logout()
                        handleClose()
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize='small' />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Fragment>
    )
}

export default AccountMenu
