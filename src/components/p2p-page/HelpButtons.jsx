import React from 'react'
import { Stack, Typography } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { AddsButton, AddsCard } from './Styled'
import { FormSectionWrapper } from '../orderCreate-page/Styled'
import { LineDivider } from './userDeals/Styled'

export const HelpButtons = () => {
  return (
    <AddsCard>
      <FormSectionWrapper>
        <Stack>
          <AddsButton>
            <Stack alignItems={'center'} justifyContent={'start'} flexDirection={'row'} gap={2} width={'100%'}>
              <NotificationsIcon color='gray' />
              <Typography>Уведомления</Typography>
            </Stack>
          </AddsButton>
          <LineDivider />
          <AddsButton >
            <Stack alignItems={'center'} justifyContent={'start'} flexDirection={'row'} gap={2} width={'100%'}>
              <HelpOutlineIcon color='gray' />
              <Typography>FAQ</Typography>
            </Stack>
          </AddsButton>
        </Stack>
      </FormSectionWrapper>
    </AddsCard>
  )
}
