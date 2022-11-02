import { Box, Container, Grid, Typography } from '@material-ui/core'
import TableRatingAdmin from '../TableRatingAdmin';
import RatingAverage from '../RatingAverage';
import { useState } from 'react'

export default function AdminPageContent() {

    const [refresh, setRefresh] = useState<boolean>(false)

    return (
        <Container maxWidth="lg">
            <TableRatingAdmin setRefresh={setRefresh} />
        </Container >
    )
}