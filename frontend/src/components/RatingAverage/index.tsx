import { Box, Grid, Rating, Typography } from '@mui/material'
import { RatingAllStats } from '../../schemas'


interface IPros {
    ratingsAllStats: RatingAllStats
}
export default function RatingAverage({ ratingsAllStats }: IPros) {

    return (

        <Box sx={{ width: '100%', marginTop: '4vh' }}>
            <Box sx={{ justifyContent: 'space-between', display: 'flex', margin: '3vh' }}>
                <Box sx={{ width: '25%' }}>
                    <Typography variant='h4' color="primary">
                        {ratingsAllStats?.totalRating}
                    </Typography>
                    <Typography >Número total de avaliações</Typography>
                </Box>
                <Box sx={{ width: '25%' }}>
                    <Typography variant='h4' color="#2e7d32">
                        {ratingsAllStats?.numberRatingVerified}
                    </Typography>
                    <Typography >Número total de avaliações aceitas</Typography>
                </Box>
                <Box sx={{ width: '25%' }}>
                    <Typography variant='h4' color="error">
                        {ratingsAllStats?.numberRatingNotVerified}
                    </Typography>
                    <Typography >Número total de avaliações pendentes</Typography>
                </Box>
                <Box sx={{ width: '25%' }}>
                    <Rating name="read-only" value={ratingsAllStats?.averageRating} readOnly precision={0.5} />
                    <Typography >Média total das avaliações em estrelas</Typography>
                </Box>
            </Box>

        </Box>
    )
}