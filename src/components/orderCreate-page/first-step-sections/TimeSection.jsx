import React from 'react'
import { Typography } from '@mui/material'
import { FormSelect } from '../Styled'
import { FormStackSection } from '../../form/FormStackSection'

export const TimeSection = ({ setTime }) => {
  const handleTimeSelect = (event) => {
    setTime(event.target.value)
  }

  return (
    <FormStackSection mt={2}>
      <Typography>Время на оплату</Typography>
      <FormSelect defaultValue={15} disableUnderline onChange={handleTimeSelect}>
        <option value={15}>15 мин</option>
        <option value={30}>30 мин</option>
        <option value={60}>1 час</option>
        <option value={120}>2 часа</option>
      </FormSelect>
    </FormStackSection>
  )
}
