import React from 'react'
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Stack, Typography } from '@mui/material'
import { FormContentWrapper } from '../../orderCreate-page/Styled'
import { FormStackSection } from '../../form/FormStackSection'
import { CopyButton } from './CopyButton';

export const DealPayments = ({ payment }) => {
  console.log(payment)

  // поменять на нормальный номер карты или телефон

  return payment ? (
    <Stack gap={0.2}>
      <FormContentWrapper>
        <Typography variant='gray' fontSize={14}>СОВЕРШИТЕ ПЛАТЁЖ</Typography>
      </FormContentWrapper>
      <FormStackSection>
        <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
          <AccountBalanceIcon color='primary' />
          <Stack>
            <Typography variant={'gray'}>Метод оплаты</Typography>
            <Typography>Альфа-Банк</Typography>
          </Stack>
        </Stack>
      </FormStackSection>
      <FormStackSection flexDirection={'row'} alignItems={'center'}>
        <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
          <PaymentIcon color='primary' />
          <Stack>
            <Typography variant={'gray'}>Аккаунт, номер карты или телефон</Typography>
            <Typography>5469021249433536</Typography>
          </Stack>
        </Stack>
        <CopyButton text={'5469021249433536'} />
      </FormStackSection>
    </Stack>
  ) : <></>
}
