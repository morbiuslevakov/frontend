import React from 'react'
import { AddsButton, AddsCard } from './Styled'
import { Stack, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useNavigate } from 'react-router-dom';

export const AddsSection = () => {
  const navigate = useNavigate()

  const handleCreateAd = () => {
    navigate('/p2p/create-order')
  }

  return (
    <AddsCard>
      <Stack>
        <AddsButton>
          <Stack alignItems={'center'} justifyContent={'start'} flexDirection={'row'} gap={2} width={'100%'}>
            <Inventory2OutlinedIcon fontSize="small" />
            <Stack alignItems={'start'}>
              <Typography>Мои объявления</Typography>
              <Typography textTransform="none" variant="gray">Настройки объявлений и платежей</Typography>
            </Stack>
          </Stack>
        </AddsButton>
        <AddsButton variant="contained" color="blue" onClick={handleCreateAd}>
          <AddCircleOutlineIcon fontSize="small" />
          <Typography variant="secondary" pl={1}>Создать объявление</Typography>
        </AddsButton>
      </Stack>
    </AddsCard>
  )
}
