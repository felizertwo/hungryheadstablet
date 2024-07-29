import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const InactivityModal = ({ open, onStay, onLogout, leftInSecond }) => {
    const [left, setLeft] = useState(leftInSecond);

    const decrement = () => {
        if (open && left > 1) {
            setLeft(prev => prev - 1);
            setTimeout(decrement, 1000);
        }
    };

   useEffect(() => {
       if (open) {
           setLeft(leftInSecond);
           setTimeout(decrement, 1000);
       } else {
           setLeft(leftInSecond);
       }
   }, [open])

    return (
        <Dialog open={open} onClose={onLogout}>
            <DialogTitle>Sitzung läuft ab in {left}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Ihre Sitzung läuft aufgrund von Inaktivität bald ab. Möchten Sie angemeldet bleiben?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onStay} color="primary">
                    Stay Logged In
                </Button>
                <Button onClick={onLogout} color="secondary">
                    Log Out
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InactivityModal;
