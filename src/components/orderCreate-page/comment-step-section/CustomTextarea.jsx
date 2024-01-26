import React from 'react'
import { useTheme } from '@mui/material';
import { TextArea } from './Styled'

export const CustomTextarea = ({ value, setValue }) => {
  const theme = useTheme();

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <TextArea value={value} onChange={handleChange} placeholder='Введите сообщение' minRows={5} maxRows={5} theme={theme} />
  )
}
