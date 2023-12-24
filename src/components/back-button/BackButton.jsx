import React from 'react'
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Typography } from '@mui/material';
import { Wrapper } from './Styled';

export const BackButton = () => {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return <Wrapper onClick={handleBack} color='gray' fullWidth>
    <ArrowBackIosIcon fontSize='0.5em' />
    <Typography variant="gray">Назад</Typography>
  </Wrapper>
}
