import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material';

export const ConfirmEmail = ({ open, onClose }) => {
  const handleClose = () => {
    onClose(false)
  }

  const handleResend = () => {
    console.log('отправить повторно')
  }

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { backgroundColor: '#2D2E2F', p: 2 } }} >
      <DialogTitle >
        <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
          <HighlightOffIcon color="red" fontSize="large" />
          <Typography>Пользователь должен быть подтвержден</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText color={'white'}>
          Учетная запись не активирована. Для использования приложения подтвердите ваш e-mail или отправьте письмо повторно.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button fullWidth autoFocus onClick={handleResend} variant="contained" color="aqua">
          Отправить повторно
        </Button>
      </DialogActions>
    </Dialog >
  );
}
