import { RatingPublicType } from '../../schemas'
import { useEffect, useState, useRef } from 'react'
import { Requests } from '../../services/Requests'
import { Backdrop, Box, CircularProgress, Rating, Stack, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function ListRadingVerified() {

    const [loading, setLoading] = useState<boolean>(false);
    const [ratings, setRatings] = useState<RatingPublicType[]>([])

    const [value, setValue] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {


        async function fetchMyAPI() {
            setLoading(true)
            await Requests.getAllRatingVerified().then(res => {
                setRatings(res.data)
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        }

        fetchMyAPI()

    }, [])

    return (

        <Box sx={{ marginTop: '3vh' }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Typography variant='h4'>Algumas avaliações de usúarios:</Typography>

            <Box sx={{ pb: 7 }} ref={ref}>
                <CssBaseline />
                <List>
                    {ratings.map(({ name, ratingOne, ratingTwo, ratingThree, ratingFour, ratingDate, ratingText }, index) => (
                        <ListItem key={index}>
                            <Box sx={{ width: '100%' }}>
                                <Stack direction="row" spacing={2}>
                                    <Box sx={{ width: "50%" }}>
                                        <Typography color="primary">{name}</Typography>
                                        <Typography>{ratingText}</Typography>
                                    </Box>
                                    <Box sx={{ width: "50%", justifyContent: 'center', display: 'flex' }}>
                                        <Box>
                                            <Typography>Média das Avaliações</Typography>
                                            <Rating name="read-only" value={(ratingOne + ratingTwo + ratingThree + ratingFour) / 4} readOnly precision={0.5} />
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    )
}