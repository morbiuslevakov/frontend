import React from 'react'
import { Button, InputAdornment, Typography } from '@mui/material'
import { FormContentWrapper } from '../../orderCreate-page/Styled'
import { FormInput } from './Styled'
import { P2PInputHandleChange, calcutaleInputWidth } from '../../../utils/p2p-utils'

export const InputSection = ({ amount, setAmount, states, oneTokenPrice, maxLimit }) => {
  const calculatedWidth = calcutaleInputWidth(amount)

  const handleChange = (event) => {
    P2PInputHandleChange(event, setAmount, maxLimit)
  }

  const handleMax = () => {
    setAmount(maxLimit)
  }

  return (
    <FormContentWrapper mb={4}>
      <FormInput variant="standard" width={calculatedWidth} value={amount} onChange={handleChange} InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position='start'>
            <Typography pt={2} variant='gray' fontSize={40} fontWeight={600}>{states.currency}</Typography>
          </InputAdornment>
        )
      }} />
      <Typography ml={1} mb={1}>Цена за 1 {states.crypto} ≈ {oneTokenPrice} {states.currency}</Typography>
      <Button color='blue' onClick={handleMax}>Купить все</Button>
    </FormContentWrapper>
  )
}
