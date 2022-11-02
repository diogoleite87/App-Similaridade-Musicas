import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface IProps {
    openTextDialog: boolean
    setOpenTextDialog(state: boolean): void
    userRatingName: string
    ratingText: string
}

export default function TextDialog({ openTextDialog, setOpenTextDialog, userRatingName, ratingText }: IProps) {

    const handleClose = () => {
        setOpenTextDialog(!openTextDialog);
    };

    return (
        <div>
            <Dialog
                open={openTextDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Comentário deixado pelo avaliador ${userRatingName}.`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {ratingText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Ok!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
