import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, type AlertColor, type AlertProps, type AlertPropsColorOverrides } from '@mui/material';
import type { OverridableStringUnion } from '@mui/types';

export default function NotifyUsers({message, isOpen, severity, handleClose}:{message:string, isOpen:boolean, severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>, handleClose:()=>void}) {

  // const handleClose = (
  //   event: React.SyntheticEvent | Event,
  //   reason?: SnackbarCloseReason,
  // ) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={8000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose}
            severity={severity}
            variant="filled"
            sx={{ width: '100%' }}>
            {message}
        </Alert>
      </Snackbar>
    </div>
  );
}