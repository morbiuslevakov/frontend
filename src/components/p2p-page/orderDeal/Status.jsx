import React from 'react'
import { Stack, Typography } from '@mui/material'
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FormStackSection } from '../../form/FormStackSection'

// {"dealId":"65e383ea57c44e38659371f3","status":"OPENED",
// "assetId":"65d305b8ead27cc777095fe8","assetAlias":"YUSRA",
// "amount":12.171052631578949,"sum":222.00000000000003,"price":18.24,
// "currency":"RUB","paymentTime":15,"chatAvailable":true,
// "payment":{"id":"65dcfb727364a9728fbd2ecb","type":"BANK","account":"79999999999","bank":{"id":"65d324fd97ba9a0aac8b07a6","name":"Тинькофф"}},
// "createdAt":1709409258637,"maker":{"role":"SELLER","deals":0,"completedPercent":0,"username":"morbiuslevakov"},
// "taker":{"role":"SELLER","deals":0,"completedPercent":0,"username":"howtonik"}}

const getStatusText = (status) => {
  switch (status) {
    case 'INITIALIZED':
      return "Ожидается подтверждение продавца"
    case 'OPENED':
      return "Продавец подтвердил сделку"
    case 'PROCESSED':
      return "Продавец подтвердил сделку"
    default:
      return 'Сделка формируется'
  }
}

const getStatusAdditionalText = (status, paymentTime, dealSum, currency) => {
  switch (status) {
    case 'INITIALIZED':
      return "Ожидается подтверждение сделки от продавца"
    case 'OPENED':
      return `Вы должны отправить ${dealSum} ${currency} в течение ${paymentTime} мин`
    case 'PROCESSED':
      return `Вы должны отправить ${dealSum} ${currency} в течение ${paymentTime} мин`
    default:
      return 'Продавец должен подтвердить сделку в течении 10 минут после ее создания'
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

export const Status = ({ deal }) => {
  const status = deal.status;

  // console.log(status)

  const dealSum = parseFloat(Number(deal.sum).toFixed(2))
  const statusText = getStatusText(status)
  const statusIcon = getStatusIcon(status)
  const additionalText = getStatusAdditionalText(status, deal.paymentTime, dealSum, deal.currency)

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
