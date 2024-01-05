import React from 'react'
import { Stack, Typography } from '@mui/material'
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { WalletButton } from './Styled'
import { TotalBalance } from './TotalBalance';
import { LargeAvatar } from '../avatar/LargeAvatar';

export const UserSection = ({ user, walletInfo }) => {
  const userBalance = walletInfo.balance?.toFixed(2);
  const currencySymbol = walletInfo.symbol;

  return (
    <Stack flexDirection={'row'} alignItems={'center'} gap={6}>
      <LargeAvatar name={user.name} />
      <Stack gap={1} alignItems={'start'}>
        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
          <Typography variant="gray" fontWeight={600} fontSize={18}>Общий баланс</Typography>
          <HelpOutlineRoundedIcon color="gray" />
        </Stack>
        <TotalBalance currency={currencySymbol} balance={userBalance} />
        <WalletButton variant="outlined"><CallMadeRoundedIcon />Отправить</WalletButton>
        <WalletButton variant="outlined"><CallReceivedRoundedIcon />Получить</WalletButton>
      </Stack>
    </Stack>
  )
}