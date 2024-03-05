import React from 'react'
import { FormContentWrapper } from '../Styled'
import { Stack, Typography } from '@mui/material'

export const CommentWarning = () => {
  return (
    <FormContentWrapper mb={2}>
      <Stack>
        <Typography variant={'lightBrown'} fontWeight={600}>Пример сообщения:</Typography>
        <Typography variant={'lightBrown'}>
          Владельцем платежного счета и аккаунта на P2P должен быть один человек. Не указывайте контактные данные
          в комментарии к ордеру
        </Typography>
      </Stack>
    </FormContentWrapper>
  )
}
