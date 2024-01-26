import React from 'react'
import { Stack, Typography } from '@mui/material'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import { FormStackSection } from '../../form/FormStackSection'
import { FormContentWrapper } from '../../orderCreate-page/Styled'

export const OrderFormingDetails = ({ states, setState, amount, tokenPrice, order }) => {
  const finalAmount = (amount / tokenPrice).toFixed(2)

  return (
    <Stack gap={3}>
      <FormContentWrapper>
        <Stack flexDirection={'row'} gap={2} justifyContent={'center'}>
          <Typography fontSize={48} fontWeight={600}>{finalAmount}</Typography>
          <Typography variant={'gray'} fontSize={32} fontWeight={600} pt={2.7}>{states.crypto}</Typography>
        </Stack>
      </FormContentWrapper>
      <Stack gap={0.2}>
        <FormStackSection>
          <Stack>
            <Typography variant={'gray'}>Статус</Typography>
            <Typography>Сделка формируется</Typography>
          </Stack>
          <WatchLaterRoundedIcon color='blue' fontSize='large' />
        </FormStackSection>
        <FormStackSection>
          <Stack>
            <Typography variant={'gray'}>Внимание</Typography>
            <Typography>Продавец должен подтвердить сделку в течении 10 минут после ее создания</Typography>
          </Stack>
          <WarningRoundedIcon color='yellow' fontSize='large' />
        </FormStackSection>
        <FormContentWrapper>
          <Typography variant={'gray'} fontSize={14}>Завершите создание сделки в течение 2:51</Typography>
        </FormContentWrapper>
      </Stack>
      <Stack gap={0.2}>
        <FormStackSection>
          <Typography>Цена за 1 {states.crypto}</Typography>
          <Typography>{tokenPrice} {states.currency}</Typography>
        </FormStackSection>
        <FormStackSection>
          <Typography>Сумма</Typography>
          <Typography>{amount} {states.currency}</Typography>
        </FormStackSection>
        <FormStackSection>
          <Typography>Методы оплаты</Typography>
          <Typography>{order.payments}</Typography>
        </FormStackSection>
        <FormStackSection>
          <Typography>Время на оплату</Typography>
          <Typography>15 мин</Typography>
        </FormStackSection>
      </Stack>
    </Stack>
  )
}
