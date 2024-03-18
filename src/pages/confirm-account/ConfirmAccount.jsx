import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Link, Stack, Typography } from '@mui/material';
import { confirmAccountApi } from '../../utils/api-utils'
import { SubmitButton } from '../../components/auth-pages/Styled';
import { Loader } from '../../components/loader/Loader';

export const ConfirmAccount = () => {
  const { token } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  if (token) {
    confirmAccountApi(token).catch(error => {
      setError(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleNavigate = () => {
    navigate('/p2p')
  }

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <Stack width={'100%'} height={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <Stack gap={2} alignItems={'center'}>
        <Stack flexDirection={'row'} gap={1}>
          <ErrorIcon color='red' />
          <Typography>Ваш аккаунт не подтвержден!</Typography>
        </Stack>
        <Link href="https://t.me/jovanovic_bogdan" pb={2} color={'#667DEA'}>Напишите нам в поддержку (телеграм)</Link>
        <SubmitButton onClick={handleNavigate} >Посмотреть площадку</SubmitButton>
      </Stack>
    </Stack>
  }

  return (
    <Stack width={'100%'} height={'100vh'} alignItems={'center'} justifyContent={'center'}>
      <Box>
        <Stack flexDirection={'row'} gap={1} pb={2}>
          <CheckCircleIcon color='aqua' />
          <Typography>Ваш аккаунт подтвержден!</Typography>
        </Stack>
        <SubmitButton onClick={handleNavigate}>Начните Торговать</SubmitButton>
      </Box>
    </Stack>
  )
}
