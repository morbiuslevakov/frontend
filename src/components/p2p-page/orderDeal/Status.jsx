import React from 'react'
import { Stack, Typography } from '@mui/material'
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FormStackSection } from '../../form/FormStackSection'

const getStatusText = (status, type) => {
  const isSell = type === "SELL";
  switch (status) {
    case 'INITIALIZED':
      return isSell ? "Ожидается подтверждение продавца" : "Ожидается подтверждение покупателя"
    case 'OPENED':
      return isSell ? "Продавец подтвердил сделку" : "Покупатель подтвердил сделку"
    case 'PROCESSED':
      return isSell ? "Продавец подтвердил сделку" : "Покупатель подтвердил сделку"
    default:
      return 'Сделка формируется'
  }
}

const getStatusAdditionalText = (status, paymentTime, dealSum, currency, type) => {
  const isSell = type === "SELL";
  switch (status) {
    case 'INITIALIZED':
      return isSell ? "Ожидается подтверждение сделки от продавца" : "Ожидается подтверждение сделки от покупателя"
    case 'OPENED':
      return isSell ? `Вы должны запросить реквизиты в течение 10 минут` : `Покупатель должен запросить реквизиты в течение 10 минут`
    case 'PROCESSED':
      return isSell ? `Вы должны отправить ${dealSum} ${currency} в течение ${paymentTime} мин` : `Покупатель должен отправить вам ${dealSum} ${currency} в течение ${paymentTime} мин`
    default:
      return isSell ? 'Продавец должен подтвердить сделку в течении 10 минут после ее создания' : "Покупатель должен подтвердить сделку в течении 10 минут после ее создания"
  }
}

const getStatusIcon = (status) => {
  switch (status) {
    case 'OPENED':
      return <CheckCircleIcon color='blue' fontSize='large' />
    case 'PROCESSED':
      return <CheckCircleIcon color='blue' fontSize='large' />
    default:
      return <WatchLaterRoundedIcon color='blue' fontSize='large' />
  }
}

export const Status = ({ type, deal }) => {
  const status = deal.status;

  const dealSum = parseFloat(Number(deal.sum).toFixed(2))
  const statusText = getStatusText(status, type)
  const statusIcon = getStatusIcon(status)
  const additionalText = getStatusAdditionalText(status, deal.paymentTime, dealSum, deal.currency, type)

  return (
    <>
      <FormStackSection>
        <Stack>
          <Typography variant={'gray'}>Статус</Typography>
          <Typography>{statusText}</Typography>
        </Stack>
        {statusIcon}
      </FormStackSection>
      <FormStackSection>
        <Stack>
          <Typography variant={'gray'}>Внимание</Typography>
          <Typography>{additionalText}</Typography>
        </Stack>
        <WarningRoundedIcon color='yellow' fontSize='large' />
      </FormStackSection>
    </>
  )
}
