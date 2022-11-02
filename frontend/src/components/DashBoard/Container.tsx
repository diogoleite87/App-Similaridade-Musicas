import { Container, Grid } from '@mui/material'

interface DashboardContentContainerProps {
    children: JSX.Element | JSX.Element[]
}

export function DashboardContentContainer({
    children
}: DashboardContentContainerProps) {
    return (
        <Container style={{ width: '100%', height: '100%', marginTop: '60px' }}>
            <Grid
                container
                spacing={3}
                justifyContent="space-between"
                alignItems="center"
            >
                {children}
            </Grid>
        </Container>
    )
}