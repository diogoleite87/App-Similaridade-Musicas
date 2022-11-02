import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import GitHubIcon from '@mui/icons-material/GitHub';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface MyListItemProps {
    icon: JSX.Element
    url: string
    iconText: string
}

function MyListItem({ icon, url, iconText }: MyListItemProps) {
    const navigate = useNavigate()
    const handleNavigate = () => navigate(url)

    return (
        <ListItemButton onClick={handleNavigate}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={iconText} />
        </ListItemButton>
    )
}

export function DrawerListItem() {
    return (
        <List>
            <MyListItem
                icon={<HomeIcon />}
                url="/"
                iconText="Ínicio"
            />
            <MyListItem
                icon={<InventoryIcon />}
                url="/aplication"
                iconText="Aplicação"
            />
            <MyListItem
                icon={<StarHalfIcon />}
                url="/rating"
                iconText="Avaliações"
            />
            <MyListItem
                icon={<AdminPanelSettingsIcon />}
                url="/adminpage"
                iconText="Administrador"
            />
            <MyListItem
                icon={<GitHubIcon />}
                url="#"
                iconText="GitHub Criador"
            />
        </List>
    )
}