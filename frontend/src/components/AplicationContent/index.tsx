import { useState, useEffect } from "react"
import { Music } from "../../schemas";
import { Requests } from "../../services/Requests"
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import ButtonGroup from '@mui/material/ButtonGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import useMediaQuery from '@mui/material/useMediaQuery';
import GitHubIcon from '@mui/icons-material/GitHub';

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 10
    },
    {
        field: 'name',
        headerName: 'Nome',
        width: 180,
        editable: false,
    },
    {
        field: 'albumName',
        headerName: 'Álbum',
        width: 140,
        editable: false,
    },
    {
        field: 'valence',
        headerName: 'Positividade',
        type: 'number',
        width: 90,
        editable: false,
    },
    {
        field: 'danceability',
        headerName: 'Dançabilidade',
        type: 'number',
        width: 110,
        editable: false,
    },
    {
        field: 'acousticness',
        headerName: 'Acústica',
        type: 'number',
        width: 110,
        editable: false,
    },
    {
        field: 'energy',
        headerName: 'Energia',
        type: 'number',
        width: 80,
        editable: false,
    },
    {
        field: 'instrumentalness',
        headerName: 'Instrumental',
        type: 'number',
        width: 100,
        editable: false,
    },
    {
        field: 'liveness',
        headerName: 'Vivacidade',
        type: 'number',
        width: 90,
        editable: false,
    },
    {
        field: 'speechiness',
        headerName: 'Fala',
        type: 'number',
        width: 80,
        editable: false,
    },
    {
        field: 'flagErr',
        headerName: 'Concluido',
        type: 'boolean',
        width: 110,
        editable: false,
    },

];

export default function AplicationContent() {

    const [uri, setUri] = useState<string>("")
    const [numberOfSongs, setNumberOfSongs] = useState<number>(0)
    const [numberOfMusicGroup, setNumberOfMusicGroup] = useState<number>(0);
    const [listMusics, setListMusics] = useState<Music[]>([])
    const [alertLoading, setAlertLoading] = useState<boolean>()
    const [buttonDisable, setButtonDisable] = useState<boolean>()
    const [alertError, setAlertError] = useState<boolean>()
    const [alertErrorMsg, setAlertErrorMsg] = useState<string>()
    const [alertSuccess, setAlertSucess] = useState<boolean>()
    const [queueMsg, setQueueMSg] = useState<string>()
    const [queueBlockButton, setQueueBlockButton] = useState<boolean>()
    const [numberOfSongError, setNumberOfSongError] = useState<boolean>()
    const [numberOfMusicGroupError, setNumberOfMusicGroupError] = useState<boolean>()
    const [customBand, setCustomBand] = useState<boolean>(false)
    const [accordion, setAccordion] = useState<boolean>(false)
    const [accordionMusic, setAccordionMusic] = useState<boolean>(false)
    const [valence, setValence] = useState<number>(0.5)
    const [acousticness, setAcoustcness] = useState<number>(0.5)
    const [danceability, setDanceability] = useState<number>(0.5)
    const [energy, setEnergy] = useState<number>(0.5)
    const [instrumentalness, setInstrumentalness] = useState<number>(0.5)
    const [liveness, setLiveness] = useState<number>(0.5)
    const [speechiness, setSpeechiness] = useState<number>(0.5)
    const [nameCustomBand, setNameCustomBand] = useState<string>("Minha Faixa")
    const [artistCustomBand, setArtistCustomBand] = useState<string>("Meu Álbum")

    const mediaQuery1600px = useMediaQuery('(min-width:1600px)');
    const mediaQuery1200px = useMediaQuery('(min-width:1200px)');
    const mediaQuery800px = useMediaQuery('(min-width:800px)');
    const mediaQuery600px = useMediaQuery('(min-width:600px)');
    const mediaQuery400px = useMediaQuery('(min-width:400px)');



    const sleep = (ms: number) => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    async function queueBlock() {

        setQueueMSg("Outra pessoa esta acessando no momento, tente novamente após 10 segundos!");
        setQueueBlockButton(true)
        await sleep(10000)
        setQueueBlockButton(false)

    }

    function valuetext(value: number) {
        return `${value}°C`;
    }

    async function searchMostSimilar() {

        if (accordion) {
            setAccordion(!accordion)
        }

        if (accordionMusic) {
            setAccordionMusic(!accordionMusic)
        }

        setAlertLoading(true);
        setAlertError(false)
        setButtonDisable(true);
        await Requests.getBestSolution(uri, numberOfSongs, numberOfMusicGroup,
            valence, acousticness, danceability, energy, instrumentalness,
            liveness, speechiness, customBand,
            nameCustomBand, artistCustomBand).then(res => {

                if (res.data[0].flagErr) {
                    setListMusics(res.data)
                    setAlertSucess(true)
                } else {
                    setAlertErrorMsg('Fila cheia!');
                    setListMusics([])
                    setAlertError(true)
                    queueBlock()
                }

            }).catch((err) => {

                if (err.code == "ERR_BAD_REQUEST") {
                    setAlertErrorMsg(`Verique os campos inseridos e busque novamente!`);
                } else {
                    setAlertErrorMsg(`Não foi possivel concluir a solicitação! ${err.code}`);
                }

                setAlertError(true)

            });
        setAlertLoading(false);
        setButtonDisable(false);

    }

    const handleCloseAlertSucess = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertSucess(false);
    };

    const handleCloseNumberOfSongsError = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setNumberOfSongError(false);
    };

    const handleCloseNumberOfMusicGroupError = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setNumberOfMusicGroupError(false);
    };

    const handleCloseAlertError = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertError(false);
    };

    function makePlaylistExample(select: number) {

        if (select == 1) {
            setUri("spotify:playlist:37i9dQZF1DX6aTaZa0K6VA")
            setNumberOfSongs(100)
            setNumberOfMusicGroup(20)
        } else if (select == 2) {
            setUri("spotify:playlist:37i9dQZF1DX0FOF1IUWK1W")
            setNumberOfSongs(50)
            setNumberOfMusicGroup(10)
        } else {
            setUri("spotify:playlist:37i9dQZEVXbMDoHDwVN2tF")
            setNumberOfSongs(50)
            setNumberOfMusicGroup(10)
        }
    }

    function clearField() {
        setUri("")
        setNumberOfSongs(0)
        setNumberOfMusicGroup(0)
    }

    function handleCustomBand() {
        setCustomBand(!customBand)

        if (accordion == true) {
            setAccordion(!accordion)
        }

        if (accordion == false && customBand == false) {
            setAccordion(!accordion)
        }
    }

    function handleAccordion() {
        setAccordion(!accordion)
    }

    function handleAccordionMusics() {
        setAccordionMusic(!accordionMusic)
    }

    function handleChangeValence(event: React.SyntheticEvent | Event, newValue: number | number[]) {
        setValence(newValue as number)
    }

    function handleChangeAcousticnes(event: React.SyntheticEvent | Event, newValue: number | number[]) {
        setAcoustcness(newValue as number)
    }

    function handleChangeDanceability(event: React.SyntheticEvent | Event, newValue: number | number[]) {
        setDanceability(newValue as number)
    }

    function handleChangeEnergy(event: React.SyntheticEvent | Event, newValue: number | number[]) {
        setEnergy(newValue as number)
    }

    function handleChangeInstrumentalness(event: React.SyntheticEvent | Event, newValue: number | number[]) {
        setInstrumentalness(newValue as number)
    }

    function handleChangeValenceLiveness(event: React.SyntheticEvent | Event, newValue: number | number[]) {
        setLiveness(newValue as number)
    }

    function handleChangeSpeechiness(event: React.SyntheticEvent | Event, newValue: number | number[]) {
        setSpeechiness(newValue as number)
    }

    useEffect(() => {

        if (numberOfSongs > 100) {
            setNumberOfSongs(100)
            setNumberOfSongError(true)
        }

        if (numberOfMusicGroup > numberOfSongs) {
            setNumberOfMusicGroup(numberOfSongs)
            setNumberOfMusicGroupError(true)
        }
    }, [numberOfSongs, numberOfMusicGroup])

    return (

        <Container maxWidth='lg' >

            <h1>Similaridade entre Músicas no Spotify</h1>
            <h4>Uma abordargem via Metaheurísticas BRKGA para o problema de minimização da Soma das Diversidades</h4>

            <Box sx={{ alignItens: "center", textAlign: "center", marginBottom: "3vh", marginTop: "3vh" }}>
                <h4>Escolha uma das 3 Playlist exemplo</h4>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" disabled={buttonDisable}>
                    <Button onClick={() => makePlaylistExample(1)}>pop up</Button>
                    <Button onClick={() => makePlaylistExample(2)}>top brasil</Button>
                    <Button onClick={() => makePlaylistExample(3)}>top 50 - mundo</Button>
                </ButtonGroup>
                <h4>Ou, se preferir, preencha os campos abaixo: </h4>
            </Box>

            <Stack spacing={2} sx={{ alignItems: "center" }}>

                <Stack sx={{ width: "80%" }}>
                    <TextField id="outlined-basic" label="URI Playlist" variant="outlined" type="text" onChange={(e) => setUri(String(e.target.value))} disabled={buttonDisable} value={uri} fullWidth />
                </Stack>

                <Stack direction="row" spacing={2} sx={{ width: "80%", justifyContent: "center" }}>
                    <TextField sx={{ width: "50%" }} id="outlined-basic" label="Numero de Músicas" variant="outlined" type="number" onChange={(e) => setNumberOfSongs(Number(e.target.value))} disabled={buttonDisable} value={numberOfSongs} />
                    <TextField sx={{ width: "50%" }} id="outlined-basic" label="Grupo de Músicas" variant="outlined" type="number" onChange={(e) => setNumberOfMusicGroup(Number(e.target.value))} disabled={buttonDisable} value={numberOfMusicGroup} />
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Button variant="contained" component="label" color="error" disabled={!buttonDisable || listMusics.length <= 0}>cancelar</Button>
                    <Button variant="contained" component="label" color="warning" onClick={clearField} disabled={buttonDisable}>limpar</Button>
                    <Button variant="contained" color="success" onClick={searchMostSimilar} disabled={buttonDisable || queueBlockButton}>buscar</Button>
                </Stack>

                {queueBlockButton ? (<h5 style={{ color: "red", fontSize: "1.6vh" }}>{queueMsg}</h5>) : null}

            </Stack>


            <FormGroup sx={{ marginTop: "1vh" }}>
                <FormControlLabel control={<Checkbox defaultChecked={false} checked={customBand} onChange={handleCustomBand} disabled={buttonDisable} />} label="Adicionar Faixa Personalizada" />
            </FormGroup>

            <Accordion sx={{ marginTop: "1vh" }} disabled={!customBand || buttonDisable} expanded={accordion} onChange={handleAccordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Customizar Faixa Personalizada</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <Box sx={{ width: "100%" }}>

                        <Stack direction="row" spacing={2}>
                            <Box sx={{ width: "50%" }}>
                                <TextField id="outlined-basic" label="Nome da Faixa Personalizada" variant="outlined" type="text" fullWidth disabled={!customBand} onChange={(e) => setNameCustomBand(e.target.value)} value={nameCustomBand} />
                            </Box>

                            <Box sx={{ width: "50%" }}>
                                <TextField id="outlined-basic" label="Álbum" variant="outlined" type="text" fullWidth disabled={!customBand} onChange={(e) => setArtistCustomBand(e.target.value)} value={artistCustomBand} />
                            </Box>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Box sx={{ width: "50%" }}>
                                <p>Índice de Positividade</p>
                                <Slider
                                    aria-label="Temperature"
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={0.01}
                                    marks
                                    min={0}
                                    max={1}
                                    disabled={!customBand}
                                    value={valence}
                                    onChange={handleChangeValence}
                                />
                            </Box>

                            <Box sx={{ width: "50%" }}>
                                <p>Índice de Dançabilidade</p>
                                <Slider
                                    aria-label="Temperature"
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={0.01}
                                    marks
                                    min={0}
                                    max={1}
                                    disabled={!customBand}
                                    value={danceability}
                                    onChange={handleChangeDanceability}
                                />
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <Box sx={{ width: "50%" }}>
                                <p>Índice de Acústica</p>
                                <Slider
                                    aria-label="Temperature"
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={0.01}
                                    marks
                                    min={0}
                                    max={1}
                                    disabled={!customBand}
                                    value={acousticness}
                                    onChange={handleChangeAcousticnes}
                                />
                            </Box>

                            <Box sx={{ width: "50%" }}>
                                <p>Índice de Energia</p>
                                <Slider
                                    aria-label="Temperature"
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={0.01}
                                    marks
                                    min={0}
                                    max={1}
                                    disabled={!customBand}
                                    value={energy}
                                    onChange={handleChangeEnergy}
                                />
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <Box sx={{ width: "50%" }}>
                                <p>Índice de Instrumental</p>
                                <Slider
                                    aria-label="Temperature"
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={0.01}
                                    marks
                                    min={0}
                                    max={1}
                                    disabled={!customBand}
                                    value={instrumentalness}
                                    onChange={handleChangeInstrumentalness}
                                />
                            </Box>

                            <Box sx={{ width: "50%" }}>
                                <p>Índice de Vivacidade</p>
                                <Slider
                                    aria-label="Temperature"
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={0.01}
                                    marks
                                    min={0}
                                    max={1}
                                    disabled={!customBand}
                                    value={liveness}
                                    onChange={handleChangeValenceLiveness}
                                />
                            </Box>
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <Box sx={{ width: "50%" }}>
                                <p>Índice de Fala</p>
                                <Slider
                                    aria-label="Temperature"
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={0.01}
                                    marks
                                    min={0}
                                    max={1}
                                    disabled={!customBand}
                                    value={speechiness}
                                    onChange={handleChangeSpeechiness}
                                />
                            </Box>

                            <Box sx={{ width: "50%", textAlign: "center", justifyContent: "center", display: "flex", alignItems: "center" }}>
                                <h5>Será criado uma faixa personalizada com base nos atributos inseridos, modifique os valores com base em sua preferência, onde 0 é nulo e 1 é total.</h5>
                            </Box>
                        </Stack>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ marginTop: "1vh" }} disabled={buttonDisable || listMusics.length <= 0} expanded={accordionMusic} onChange={handleAccordionMusics}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Box sx={{ width: "100%", height: "100%" }}>
                        <Typography>Mesma Sintonia! Expanda para se aventurar em cores e notas musicais!</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <ImageList sx={{ width: "100%", height: "100%" }} cols={mediaQuery1600px ? 6 : mediaQuery1200px ? 5 : mediaQuery800px ? 4 : mediaQuery600px ? 3 : mediaQuery400px ? 2 : 2}>
                            {listMusics.map((listMusics) => (
                                <ImageListItem key={listMusics.urlImg}>
                                    <img
                                        src={`${listMusics.urlImg}?w=248&fit=crop&auto=format`}
                                        srcSet={`${listMusics.urlImg}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={listMusics.name}
                                        loading="lazy"
                                        style={{ borderRadius: "10px" }}
                                    />

                                    <ImageListItemBar
                                        title={listMusics.name}
                                        subtitle={listMusics.albumName}
                                        sx={{ borderRadius: "10px" }}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: '#1DB954' }}
                                                aria-label={`info about ${listMusics.name}`}
                                                href={listMusics.urlMusic}
                                                target={"_blank"}
                                            >
                                                <OpenInNewIcon />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            {
                listMusics.length > 0 ? (
                    <div>

                        <h3>Lista das músicas mais semelhantes: </h3>

                        {alertLoading && (
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        )}

                        <Box sx={{ height: 650, width: '100%' }}>
                            <DataGrid
                                rows={listMusics}
                                columns={columns}
                                pageSize={listMusics.length >= 10 ? 10 : listMusics.length}
                                rowsPerPageOptions={[5]}
                                experimentalFeatures={{ newEditingApi: true }}
                            />
                        </Box>
                    </div>
                ) : (
                    <h3>Preencha os campos necessarios para efetuar a busca</h3>
                )
            }

            {
                alertLoading && listMusics.length <= 0 ? (
                    <div>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={alertLoading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </div>
                ) : null
            }

            <Snackbar open={alertSuccess} autoHideDuration={4000} onClose={handleCloseAlertSucess}>
                <Alert onClose={handleCloseAlertSucess} severity="success" sx={{ width: '100%' }}>
                    Busca efetuada com sucesso!
                </Alert>
            </Snackbar>

            <Snackbar open={alertError} autoHideDuration={6000} onClose={handleCloseAlertError}>
                <Alert onClose={handleCloseAlertError} severity="error" sx={{ width: '100%' }}>
                    {alertErrorMsg}
                </Alert>
            </Snackbar>

            <Snackbar open={alertLoading} autoHideDuration={6000} >
                <Alert severity="warning" sx={{ width: '100%' }}>
                    Não recarregue a página!
                </Alert>
            </Snackbar>

            <Snackbar open={numberOfSongError} autoHideDuration={4000} onClose={handleCloseNumberOfSongsError}>
                <Alert severity="info" sx={{ width: '100%' }}>
                    Número de musicas não pode ser maior que 100!
                </Alert>
            </Snackbar>

            <Snackbar open={numberOfMusicGroupError} autoHideDuration={4000} onClose={handleCloseNumberOfMusicGroupError}>
                <Alert severity="info" sx={{ width: '100%' }}>
                    Grupo de músicas mais semelhantes não pode ser maior que total de músicas!
                </Alert>
            </Snackbar>

            <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", width: "100%", marginTop: "3vh", marginBottom: "3vh" }}>
                <Stack direction="row" spacing={2}>
                    <IconButton aria-label="GitHub Diogo Leite" href="https://github.com/diogoleite87" target="_blank">
                        <GitHubIcon />
                    </IconButton>
                </Stack>
            </Box>

        </Container >

    )
}