import React from 'react'
import { Stack, Typography } from '@mui/material'
import CallReceivedRoundedIcon from '@mui/icons-material/CallReceivedRounded';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { WalletButton } from './Styled'
import { Avatar } from './Avatar';
import { TotalBalance } from './TotalBalance';

export const UserSection = () => {
  return (
    <Stack flexDirection={'row'} alignItems={'center'} gap={6}>
      <Avatar link="https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/4486ff4d-dbb8-40e7-99cb-a1754950f281/220x330" />
      <Stack gap={1} alignItems={'start'}>
        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
          <Typography variant="gray" fontWeight={600} fontSize={18}>Общий баланс</Typography>
          <HelpOutlineRoundedIcon color="gray" />
        </Stack>
        <TotalBalance currency='$' balance="7616.16" />
        <WalletButton variant="outlined"><CallMadeRoundedIcon />Отправить</WalletButton>
        <WalletButton variant="outlined"><CallReceivedRoundedIcon />Получить</WalletButton>
      </Stack>
    </Stack>
  )
}
