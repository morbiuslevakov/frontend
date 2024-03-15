import React, { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import DoneIcon from '@mui/icons-material/Done';
import { WalletButton } from './Styled'
import { TotalBalance } from './TotalBalance';
import { LargeAvatar } from '../avatar/LargeAvatar';

export const UserSection = ({ user, walletInfo }) => {
  const userBalance = walletInfo.sum?.toFixed(2);
  const currencySymbol = walletInfo.symbol;

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(user.address)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }
  const copyIcon = copied ? <DoneIcon fontSize='small' color='primary' /> : <CallReceivedRoundedIcon fontSize='small' color='primary' />

  const recieveText = copied ? "Адрес скопирован" : "Получить"

  return (
    <Stack px={2} gap={2}>
      <Stack flexDirection={'row'} alignItems={'center'} gap={6}>
        <LargeAvatar username={user.username} />
        <Stack gap={1} alignItems={'start'}>
          <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
            <Typography variant="gray" fontWeight={600} fontSize={18}>Общий баланс</Typography>
            <HelpOutlineRoundedIcon color="gray" />
          </Stack>
          <TotalBalance currency={currencySymbol} balance={userBalance} />
        </Stack>
      </Stack>
      <Stack flexDirection={'row'}>
        <WalletButton variant="outlined" disabled><CallMadeRoundedIcon />Отправить</WalletButton>
        <WalletButton variant="outlined" onClick={handleCopy}>{copyIcon}{recieveText}</WalletButton>
      </Stack>
    </Stack>
  )
}