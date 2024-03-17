import React from 'react'
import { Box, MenuItem, Select, Stack, Switch, Typography, styled } from '@mui/material'
import { ProfileCard } from './Styled'

const CustomSelect = styled(Select)({
  '& .MuiSelect-filled': {
    '& .MuiSelect-iconFilled': {
      fill: '#FFFFF !important',
    },
    padding: '6px 32px 6px 12px',
  },
})

export const Notifications = () => {
  return <ProfileCard>
    <Stack gap={2}>
      <Typography fontSize={26} lineHeight={1}>Настройка уведомлений</Typography>
      <Stack gap={2}>
        <Typography variant="lightGray" fontWeight={600} fontSize={14} lineHeight={1}>Язык уведомлений:</Typography>
        <Box>
          <CustomSelect value={'Russian'} disabled color='red' variant='filled'>
            <MenuItem value={'Russian'}>Русский</MenuItem>
          </CustomSelect>
        </Box>
      </Stack>
      <Stack gap={2}>
        <Typography variant="lightGray" fontWeight={600} fontSize={14} lineHeight={1}>Иноформационные рассылки:</Typography>
        <Stack flexDirection={'row'}>
          <Typography fontSize={12} maxWidth={'300px'} variant={'gray'}>
            После отключения вы не будете получать
            маркетинговые уведомления (по эл.почте,
            телеграм и входящие уведомления на сайте)
          </Typography>
          <Switch defaultChecked disabled />
        </Stack>
      </Stack>
    </Stack>
  </ProfileCard>
}
