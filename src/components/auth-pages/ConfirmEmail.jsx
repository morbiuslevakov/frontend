import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material';
import { resendConfirmApi } from '../../utils/api-utils';

export const ConfirmEmail = ({ open, onClose, email }) => {
  const handleClose = () => {
    onClose(false)
  }

  const handleResend = async () => {
    resendConfirmApi(email).then(handleClose).catch(error => { console.log(error) })
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
