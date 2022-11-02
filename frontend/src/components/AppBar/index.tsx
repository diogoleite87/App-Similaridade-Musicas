import Menu from '@mui/icons-material/Menu'
import { styled, Typography } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { useHref, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import InventoryIcon from '@mui/icons-material/Inventory'
import { useState } from 'react'
import RatingDialog from '../RatingDialog/index'


interface AppBarProps {
    open?: boolean
    toggleDrawer(): void
}

interface AppBarSetup {
    open?: boolean
}

const AppBarSetup = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open'
})<AppBarSetup>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: 240,
        width: `calc(100% - ${240}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}))

export function AppBar({ open, toggleDrawer }: AppBarProps) {

    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const navigateAplication = () => {
        navigate('/aplication')
    }

    return (
        <AppBarSetup position="absolute" open={open}>

            <RatingDialog state={openDialog} setState={setOpenDialog} />

            <Toolbar sx={{ pr: '24px' }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open-drawer"
                    onClick={toggleDrawer}
                    sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
                >
                    <Menu />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    {'Similiaridade Entre Músicas'}
                </Typography>

                <Box sx={{}}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" component="label" color="success" startIcon={<StarHalfIcon />} onClick={() => setOpenDialog(true)}>Avaliar</Button>
                        <Button variant="contained" component="label" color="warning" startIcon={<InventoryIcon />} onClick={navigateAplication}>Aplicação</Button>
                    </Stack>
                </Box>

            </Toolbar>
        </AppBarSetup>
    )
}