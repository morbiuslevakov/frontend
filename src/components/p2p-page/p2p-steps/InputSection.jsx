import React from 'react'
import { Box, Button, InputAdornment, Typography } from '@mui/material'
import { FormContentWrapper } from '../../orderCreate-page/Styled'
import { FormInput } from './Styled'
import { P2PInputHandleChange, calcutaleInputWidth, inputText } from '../../../utils/p2p-utils'

export const InputSection = ({ amount, setAmount, states, oneTokenPrice, maxLimit }) => {
  // const calculatedWidth = calcutaleInputWidth(amount)
  const inputAdornment = inputText(states.type, states.crypto, states.currency)
  const cryptoInCurrency = parseFloat((amount * oneTokenPrice).toFixed(2))
  const isBuy = states.type === "BUY"

  const handleChange = (event) => {
    P2PInputHandleChange(event, setAmount, maxLimit)
  }

  const handleMax = () => {
    setAmount(maxLimit)
  }

  return (
    <FormContentWrapper mb={4}>
      <FormInput variant="standard" width={'400px'} value={amount} onChange={handleChange} InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position='start'>
            <Typography pt={2} variant='gray' fontSize={40} fontWeight={600}>{inputAdornment}</Typography>
          </InputAdornment>
        )
      }} />
      {isBuy && <Box ml={1}><Typography variant={'gray'} >{cryptoInCurrency} {states.currency}</Typography></Box>}
      <Typography ml={1} mb={1}>Цена за 1 {states.crypto} ≈ {oneTokenPrice} {states.currency}</Typography>
      <Button color='blue' onClick={handleMax}>Купить все</Button>
    </FormContentWrapper>
  )
}
