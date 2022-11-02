import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { RatingAllStats, RatingType } from '../../schemas'
import { useEffect, useState } from 'react'
import { Requests } from '../../services/Requests'
import { Backdrop, Box, Button, CircularProgress, Grid, IconButton, Rating, Stack } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import TextDialog from '../TextDialog'
import RatingAverage from '../RatingAverage';

interface Column {
    id: 'email' | 'name' | 'ratingAverage' | 'ratingDate' | 'ratingText' | 'verified';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

interface IPros {
    setRefresh(state: boolean): void;
}

const columns: readonly Column[] = [
    { id: 'email', label: 'Email', minWidth: 80 },
    { id: 'name', label: 'Nome', minWidth: 100 },
    { id: 'ratingAverage', label: 'Média Avaliações', minWidth: 100 },
    { id: 'ratingDate', label: 'Data Avaliação', minWidth: 100 },
    { id: 'ratingText', label: 'Comentário', minWidth: 100 },
    { id: 'verified', label: 'Verificar', minWidth: 120 },
];


export default function TableRatingAdmin({ setRefresh }: IPros) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [ratings, setRatings] = useState<RatingType[]>([])
    const [openTextDialog, setOpenTextDialog] = useState(false);
    const [textDialog, setTextDialog] = useState<string>("");
    const [nameDialog, setNameDialog] = useState<string>("");
    const [ratingAllStats, setRatingAllStats] = useState<RatingAllStats>({ averageRating: 5 } as RatingAllStats)

    useEffect(() => {


        async function fetchMyAPI() {
            await Requests.getAllRating().then(res => {
                setRatings(res.data)
            }).catch(err => {
            })

            await Requests.getAllRatingInfo().then(res => {
                setRatingAllStats(res.data)
            }).catch(err => {

            })
        }

        fetchMyAPI()

    }, [loading])

    const verifiedRating = (email: string, verified: boolean) => {

        async function fetchMyAPI() {
            setLoading(true)
            Requests.putVerifiedRating(email, verified).then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        }

        fetchMyAPI()
    }

    const deleteRating = (email: string) => {

        async function fetchMyAPI() {
            setLoading(true)
            await Requests.deleteRating(email).then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })

        }

        fetchMyAPI()
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const openDialog = (text: string, name: string) => {
        setTextDialog(text)
        setNameDialog(name)
        setOpenTextDialog(true)
    }

    function formatDate(date: Date) {
        var date = new Date(date)
        var day = date.getDate().toString().padStart(2, '0')
        var month = (date.getMonth() + 1).toString().padStart(2, '0')
        var year = date.getFullYear()
        return day + "/" + month + "/" + year;
    }

    return (
        <Box sx={{ width: '100%' }}>

            <RatingAverage ratingsAllStats={ratingAllStats} />
            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '5vh' }}>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="center"
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {ratings.map(ratings => (
                                <TableRow key={ratings.email}>
                                    <TableCell align="center">{ratings.email}</TableCell>
                                    <TableCell align="center">{ratings.name}</TableCell>

                                    <TableCell align="center">
                                        <Rating name="read-only" value={ratings.ratingOne} readOnly precision={0.5} />
                                    </TableCell>
                                    <TableCell align="center">{formatDate(ratings.ratingDate)}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="primary" onClick={() => openDialog(ratings.ratingText, ratings.name)}>Abrir</Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1}>
                                            <IconButton aria-label="acept" color="success" onClick={() => verifiedRating(ratings.email, true)} disabled={ratings.verified}>
                                                <DoneIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" color="error" onClick={() => verifiedRating(ratings.email, false)} disabled={!ratings.verified}>
                                                <ClearIcon />
                                            </IconButton>
                                            <IconButton aria-label="delete" color="error" onClick={() => deleteRating(ratings.email)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>

                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={ratings.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <TextDialog openTextDialog={openTextDialog} setOpenTextDialog={setOpenTextDialog} userRatingName={nameDialog} ratingText={textDialog} />

            </Paper>
        </Box>
    );
}