import React from 'react'
import { AddsButton, AddsCard } from './Styled'
import { Stack, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useNavigate } from 'react-router-dom';
import { FormSectionWrapper } from '../orderCreate-page/Styled';
import { LineDivider } from './userDeals/Styled';

export const AddsSection = () => {
  const navigate = useNavigate()

  const handleCreateAd = () => {
    navigate('/p2p/create-order')
  }

  const handleOpenOrdersPage = () => {
    navigate('/p2p/my-orders')
  }

  return (
    <AddsCard>
      <FormSectionWrapper>
        <Stack>
          <AddsButton onClick={handleOpenOrdersPage}>
            <Stack alignItems={'center'} justifyContent={'start'} flexDirection={'row'} gap={2} width={'100%'}>
              <Inventory2OutlinedIcon color='gray' />
              <Stack alignItems={'start'}>
                <Typography>Мои объявления</Typography>
                <Typography textTransform="none" variant="gray">Настройки объявлений и платежей</Typography>
              </Stack>
            </Stack>
          </AddsButton>
          <LineDivider />
          <AddsButton onClick={handleCreateAd} >
            <Stack alignItems={'center'} flexDirection={'row'} justifyContent={'start'} width={'100%'}>
              <AddCircleOutlineIcon color='blue' />
              <Typography variant="blue" pl={1}>Создать объявление</Typography>
            </Stack>
          </AddsButton>
        </Stack>
      </FormSectionWrapper>
    </AddsCard>
  )
}
