import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function NotificationSnackbar({
  open,
  message,
  severity = "success",
  onClose,
  autoHideDuration = 6000
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
