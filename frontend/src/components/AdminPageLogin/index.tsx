import { useState } from 'react'
import Container from '@mui/material/Container';
import { Box, Button, TextField, Typography, Grid, Alert } from '@mui/material';
import { Requests } from "../../services/Requests"
import { LoadingButton } from '@mui/lab';

interface Login {
    loginSuccess(): void
}

export default function AdminPageLogin({ loginSuccess }: Login) {

    const [email, setEmail] = useState<string>("diogoleite87@gmail.com")
    const [password, setPassword] = useState<string>("12345678")
    const [erro, setErro] = useState<boolean>()
    const [alertLoading, setAlertLoading] = useState<boolean>()

    async function handleLogin() {

        setAlertLoading(true)
        await Requests.getAdminLogin(email, password).then(res => {

            if (res.data) {
                loginSuccess()
                setAlertLoading(false)
            } else {
                setErro(true)
                setAlertLoading(false)
            }
        }).catch(err => {
            setErro(true)
            setAlertLoading(false)
        })
    }

    return (

        <Container maxWidth="sm">

            <Box sx={{ width: '100%', height: '100%', margin: '2vh' }}>

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '80vh' }}
                >
                    <Typography component="text" sx={{ fontSize: '2.5vh' }}>Entre com usuário e senha cadastrados no sistema.</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    {alertLoading ? <LoadingButton loading variant="contained" color='primary' fullWidth>Entrar</LoadingButton>
                        : <Button
                            onClick={handleLogin}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Entrar
                        </Button>
                    }

                    <Box sx={{ width: '100%', margin: '2vh' }}>
                        {erro ?
                            <Alert severity="error">Erro ao entrar, verifique os campos inseridos!</Alert>
                            :
                            <Typography component="text" sx={{ fontSize: '2.5vh' }}>Área destinada ao administrador, em caso de dúvidas entre em contato.</Typography>
                        }
                    </Box>

                </Grid>
            </Box>
        </Container>

    )
}