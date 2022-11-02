import { Dialog, DialogTitle } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Button,
    DialogContent,
    Divider,
    Grid,
    IconButton,
    Stack,
    useTheme,
    Box,
    Rating
} from '@mui/material'
import { ReactNode, useState, useEffect } from 'react'

import { RatingType } from "../../schemas";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Requests } from "../../services/Requests"


export interface BasicDialogProps {
    state: boolean
    setState(state: boolean): void
}

interface DialogContainerProps extends BasicDialogProps {
    children: ReactNode[]
    dialogTitle: string
}


export default function RatingDialog({
    state,
    setState,
}: BasicDialogProps) {

    const theme = useTheme()
    const [alertLoading, setAlertLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>(" ");
    const [name, setName] = useState<string>(" ");
    const [ratingOne, setRatingOne] = useState<number>(5);
    const [ratingTwo, setRatingTwo] = useState<number>(5);
    const [ratingThree, setRatingThree] = useState<number>(5);
    const [ratingFour, setRatingFour] = useState<number>(5);
    const [ratingDate, setRatingDate] = useState<Date>(new Date());
    const [text, setText] = useState<string>(" ");
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
    const [saveError, setSaveError] = useState<boolean>(false);

    function formatDate(date: Date) {
        var date = new Date(date)
        var day = date.getDate().toString().padStart(2, '0')
        var month = (date.getMonth() + 1).toString().padStart(2, '0')
        var year = date.getFullYear()
        return year + "-" + month + "-" + day;
    }

    async function insertRating() {
        setAlertLoading(true)
        const date = formatDate(ratingDate)

        await Requests.postRating({ email, name, ratingOne, ratingTwo, ratingThree, ratingFour, ratingDate: date, ratingText: text }).then(res => {
            setSaveSuccess(true)
            setAlertLoading(false)
        }).catch((err) => {
            setSaveError(true)
            setAlertLoading(false)
        })

    }

    function handleChangeRatingOne(event: React.SyntheticEvent | Event | null, newValue: number | number[] | null) {
        setRatingOne(newValue as number)
    }

    function handleChangeRatingTwo(event: React.SyntheticEvent | Event | null, newValue: number | number[] | null) {
        setRatingTwo(newValue as number)
    }

    function handleChangeRatingThree(event: React.SyntheticEvent | Event | null, newValue: number | number[] | null) {
        setRatingThree(newValue as number)
    }

    function handleChangeRatingFour(event: React.SyntheticEvent | Event | null, newValue: number | number[] | null) {
        setRatingFour(newValue as number)
    }

    return (

        <Dialog
            TransitionProps={{ unmountOnExit: true }}
            open={state}
            scroll="body"
            fullWidth
        >
            <DialogTitle color={theme.palette.grey[400]}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>Avalie a Aplicação!</Grid>
                    <Grid item>
                        <IconButton sx={{ size: 'small' }} onClick={() => setState(false)}>
                            <Close />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <Divider />

            <DialogContent>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid container flexDirection="column" item sx={{ pt: 2 }}>

                        <Box
                            sx={{
                                alignItems: "center",
                                width: "100%"
                            }}
                        >

                            <Stack spacing={2} direction="row" sx={{ marginBottom: '3vh' }}>
                                <Box sx={{ width: '50%' }}>
                                    <TextField
                                        helperText="Insira seu Email"
                                        id="email"
                                        label="Email"
                                        type="email"
                                        required
                                        fullWidth
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ width: '50%' }}>
                                    <TextField
                                        helperText="Insira seu Nome"
                                        id="name"
                                        label="Nome"
                                        type="name"
                                        required
                                        fullWidth
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Box>
                            </Stack>

                            <Box sx={{ alignItems: 'center', textAlign: 'center', marginBottom: '3vh' }}>
                                <Typography component="text" >Preencha as estrelinhas de acordo com sua satisfação!</Typography>
                            </Box>


                            <Stack spacing={2} sx={{ justifyContent: 'space-around' }} direction="row">
                                <Box>
                                    <Typography component="legend">Avaliacao 1</Typography>
                                    <Rating name="half-rating" defaultValue={5} precision={0.5} onChange={handleChangeRatingOne} />
                                </Box>
                                <Box>
                                    <Typography component="legend">Avaliacao 2</Typography>
                                    <Rating name="half-rating" defaultValue={5} precision={0.5} onChange={handleChangeRatingTwo} />
                                </Box>
                            </Stack>
                            <Stack spacing={2} sx={{ justifyContent: 'space-around' }} direction="row">
                                <Box>
                                    <Typography component="legend">Avaliacao 3</Typography>
                                    <Rating name="half-rating" defaultValue={5} precision={0.5} onChange={handleChangeRatingThree} />
                                </Box>
                                <Box>
                                    <Typography component="legend">Avaliacao 4</Typography>
                                    <Rating name="half-rating" defaultValue={5} precision={0.5} onChange={handleChangeRatingFour} />
                                </Box>
                            </Stack>

                            <Box sx={{ alignItems: 'center', textAlign: 'center', marginBottom: '3vh', marginTop: '3vh' }}>
                                <Typography component="text" >Deixe sua opinião ou uma sugestão de melhoria!</Typography>
                            </Box>

                            <Box sx={{ width: '100%' }}>
                                <TextField
                                    id="text"
                                    label="Descreva em poucas palavras"
                                    multiline
                                    rows={4}
                                    variant="standard"
                                    fullWidth
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>


            <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', textAlign: 'center', display: 'flex', marginBottom: '2vh' }}>
                {saveSuccess ?
                    <Alert severity="success">Avaliação salva! Obrigado pelo FeedBack!</Alert>
                    : saveError ?
                        <Alert severity="error">Avaliação não salva! Tente novamente em alguns instantes!</Alert>
                        : <Typography component="text" >Preencha os campus necessarios!</Typography>
                }

            </Box>


            <Divider />
            <Box sx={{ width: "100%" }}>
                <Stack spacing={2} sx={{ alignItems: "center", justifyContent: 'space-between', margin: '2vh' }} direction="row">
                    <Button variant="contained" component="label" color="error" onClick={() => setState(false)} disabled={alertLoading}>fechar</Button>

                    {alertLoading ? <LoadingButton loading variant="contained" color='primary'>salvar</LoadingButton>
                        :
                        <Button variant="contained" component="label" color="primary" onClick={insertRating}>salvar</Button>
                    }

                </Stack>
            </Box>
        </Dialog >
    )
}